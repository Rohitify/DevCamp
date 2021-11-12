const crypto = require("crypto");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../middleware/error");
const { buildOptions } = require("express-fileupload/lib/utilities");
const sendEmail = require("../utils/sendEmail");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create User 
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if(!email && !password){
    return next( new ErrorResponse(`Please provide Email and Password both`, 400) );
  }

  // Check User 
  const user = await User.findOne({ email }).select("+password");

  if(!user){
    return next( new ErrorResponse(`Invalid Credentails`, 401) );
  }
  
  // Check if password matches 
  const isMatch = await user.matchPassword(password);

  if(!isMatch){
    return next( new ErrorResponse(`Invalid Credentails`, 401) );
  }

  sendTokenResponse(user, 200, res);
});


exports.getMe = asyncHandler(async (req, res, next) =>{
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

exports.forgetPassword = asyncHandler(async (req, res, next) =>{
  const user = await User.findOne({ email: req.body.email });

  if(!user){
    return next(new ErrorResponse(`There is no user with the email ${req.body.email}, 404`));
  }

  // get reset token 
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset URL 
  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message
    });

    res.status(200).json({ success: true, data: "Email sent" })
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token 
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!user){
    return next(new ErrorResponse("Invalid token", 400));
  }

  // Set new password 
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

exports.updateDetails = asyncHandler(async (req, res, next) =>{

  const updatedetails = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, updatedetails, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

exports.updatePassword = asyncHandler(async (req, res, next) =>{
  const user = await User.findById(req.user.id).select("+password");

  const isPassword = await user.matchPassword(req.body.currentPassword);
  if(!isPassword){
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);

});


const sendTokenResponse = (user, statusCode, res) => {
  // Create token 
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure : false
  };

  if(process.env.NODE_ENV === "production"){
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token
    });
};