const path = require("path");
const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Bootcamp = require("../models/Bootcamp");

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp){
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: bootcamp
    })
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  // Add user to req.body 
  req.body.user = req.user.id;

  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  // If user is not admin it can only add ONE Bootcamp 
  if(publishedBootcamp && req.user.role !== "admin"){
    return next(new ErrorResponse(`The user with ID ${req.user.id} has already publised a bootcamp`, 400));
  }

    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
}); 

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    
    let bootcamp = await Bootcamp.findById(req.params.id);
    
    if(!bootcamp){
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    // Check the owner of Bootcamp or admin 
    if(bootcamp?.user.toString() !== req.user.id && req.user.role !== "admin"){
      return next(new ErrorResponse(`User of Id ${req.user.id} is not authorized to update the bootcamp`, 401));
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      success: true,
      data: bootcamp
    })
});

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id);
    
    if(!bootcamp){
      return next( 
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    // Check the owner of Bootcamp or admin 
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== "admin"){
      return next(new ErrorResponse(`User of Id ${req.user.id} is not authorized to delete the bootcamp`, 401));
    }

    bootcamp.remove();

    res.status(200).json({
      success: true,
      data: {}
    })
  
});

exports.getBootcampsInRadius = asyncHandler( async (req, res, next) => {
  const { pincode, distance } = req.params;

  const loc = await geocoder.geocode(pincode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calculating Radius 3963 mi or 6378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
} );

exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {

  const bootcamp = await Bootcamp.findById(req.params.id);
  
  if(!bootcamp){
    return next( 
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // Check the owner of Bootcamp or admin 
  if(bootcamp.user.toString() !== req.user.id && req.user.role !== "admin"){
    return next(new ErrorResponse(`User of Id ${req.user.id} is not authorized to update the bootcamp`, 401));
  }

  if(!req.files){
    return next( 
      new ErrorResponse(`Please Upload File`, 400)
    );
  }

  const file = req.files.file;

  // Make sure the file is image 
  if(!file.mimetype.startsWith("image")){
    return next( 
      new ErrorResponse(`Please Upload an image file`, 400)
    );
  }

  // Check file Size 
  if(file.size > process.env.MAX_FILE_UPLOAD){
    return next( 
      new ErrorResponse(`Please Upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400)
    );
  }

  // Create Custom file name to avoid overriding the same image 
  file.name = `photo_${bootcamp._id}${Date.now()}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if(err){
      console.error(err);
      return next( 
        new ErrorResponse(`Problem in uploading File`, 500)
      );
    }

    const BootcampData = await Bootcamp.findById(req.params.id);
    const BootcampPhoto = BootcampData.photo;
    console.log(BootcampPhoto);

    if(BootcampPhoto !== "no-photo.jpg") {
      // Creating a symbolic link to the file photo 
      // fs.symlinkSync(`${process.env.FILE_UPLOAD_PATH}/${BootcampPhoto}`, "symlinktoPhoto");
  
      // delete the photo 
      fs.unlink(`${process.env.FILE_UPLOAD_PATH}/${BootcampPhoto}`, (err => {
        if(err) console.log(err);
        else {
          console.log("\nDeleted : " + BootcampPhoto);
        }
      }))

    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    console.log("\n" + file.name);

    res.status(200).json({
      success: true,
      data: file.name
    });
  });

});
 