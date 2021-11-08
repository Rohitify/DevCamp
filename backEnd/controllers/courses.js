const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getCourses = asyncHandler( async (req, res, next) => {
  let query;

  if(req.params.bootcampId){
    query = Course.find({ bootcamp : req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description"
    });
    // query = Course.find().populate("bootcamp", "name description");
  }

  const courses = await query;

  res.status(200).json({
    success : true,
    count : courses.length,
    data: courses
  });
});

exports.getCourse = asyncHandler( async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate("bootcamp", "name description");

  if(!course){
    return next(new ErrorResponse(`Course do not exit with the Id of ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: course
  });
} );

exports.addCourse = asyncHandler( async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if(!bootcamp){
    return next(new ErrorResponse(`Bootcamp do not exit with the Id of ${req.params.bootcampId}`), 404);
  }

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course
  });
} );

exports.updateCourse = asyncHandler( async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if(!course){
    return next(new ErrorResponse(`Course do not exit with the Id of ${req.params.id}`), 404);
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({
    success: true,
    data: course
  });
} );

exports.deleteCourse = asyncHandler( async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if(!course){
    return next(new ErrorResponse(`Course do not exit with the Id of ${req.params.id}`), 404);
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
} );