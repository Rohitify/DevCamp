const { findByIdAndUpdate, findByIdAndRemove } = require("../models/Bootcamp");
const Bootcamp = require("../models/Bootcamp");

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    })
  } catch (err) {
    res.status(500).json({ success: false })
  }
};

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp){
      return res.status(400).json({ success: false, data: {} })
    }

    res.status(200).json({
      success: true,
      data: bootcamp
    })
  } catch (err) {
    res.status(500).json({ success: false })
  }
};

exports.createBootcamp = async (req, res, next) => {
  try {
    console.log(req.body);
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    res.status(500).json({ success: false })
  }
};

exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if(!bootcamp){
      return res.status(404).json({ success: false, data: {} })
    }

    res.status(200).json({
      success: true,
      data: bootcamp
    })
  } catch (err) {
    res.status(500).json({ success: false })
  }
};

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
    
    if(!bootcamp){
      return res.status(404).json({ success: false, data: {} })
    }

    res.status(200).json({
      success: true,
      data: {}
    })
  } catch (err) {
    res.status(500).json({ success: false })
  }
};