const router = require("express").Router();

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload } = require("../controllers/bootcamps");

const coursesRoutes = require("./courses");

// Re-Route into other Resourses 
router.use("/:bootcampId/courses", coursesRoutes);

router.route("/:id/photo")
  .put(bootcampPhotoUpload);

router.route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router.route("/radius/:pincode/:distance")
  .get(getBootcampsInRadius);

router.route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;