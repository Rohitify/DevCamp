const router = require("express").Router();

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload } = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const coursesRoutes = require("./courses");
const reviewsRoutes = require("./reviews");

// Re-Route into other Resourses 
router.use("/:bootcampId/courses", coursesRoutes);
router.use("/:bootcampId/reviews", reviewsRoutes);

router.route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

router.route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

router.route("/radius/:pincode/:distance")
  .get(getBootcampsInRadius);

router.route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

module.exports = router;