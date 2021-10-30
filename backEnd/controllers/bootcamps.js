
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Show all Bootcamps"
  });
};

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Show Single Bootcamps"
  });
};

exports.createBootcamp = (req, res, next) => {
  res.status(201).json({
    success: true,
    msg: "Create Bootcamps"
  });
};

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Update Bootcamps"
  });
};

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Delete Bootcamps"
  });
};