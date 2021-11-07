const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocoder");

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let queryStr;
  queryStr = JSON.stringify(req.params);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  const query = Bootcamp.find(JSON.parse(queryStr));

    const bootcamps = await query;

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    })
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

    console.log(req.body);
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
});

exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
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

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
    
    if(!bootcamp){
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: {}
    })
  
});

exports.getBootcampsInRadius = asyncHandler( async (req, res, next) => {
  const { pincode, distance } = req.params;

  const loc = await geocoder.geocode(pincode);
  const lat = loc[0].latitude;
  const lon = loc[0].longitude;

  // calculating Radius 3963 mi or 6378 km
  const radius = distance / 6378;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [ [ lat, lon ], radius ] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
} );
 