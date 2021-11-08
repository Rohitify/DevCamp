const path = require("path");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocoder");

exports.getBootcamps = asyncHandler(async (req, res, next) => {

  let reqQuery = { ...req.query };

  // Remove fields
  removeFields = ["select", "sort", "page", "limit"];

  removeFields.forEach(queryEle => delete reqQuery[queryEle]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  let query = Bootcamp.find(JSON.parse(queryStr)).populate("courses");

  if(req.query.select){
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if(req.query.sort){
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page -1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

    const bootcamps = await query;

    const pagination = {};

    if(endIndex < total){
      pagination.next = {
        page : page + 1,
        limit
      }
    }

    if(startIndex > 0){
      pagination.prev = {
        page : page - 1,
        limit
      }
    }


    res.status(200).json({
      success: true,
      count: bootcamps.length,
      pagination,
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

    const bootcamp = await Bootcamp.findById(req.params.id);
    
    if(!bootcamp){
      return next( 
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
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

exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {

  const bootcamp = await Bootcamp.findById(req.params.id);
  
  if(!bootcamp){
    return next( 
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
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
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if(err){
      console.error(err);
      return next( 
        new ErrorResponse(`Problem in uploading File`, 500)
      );
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });

});
 