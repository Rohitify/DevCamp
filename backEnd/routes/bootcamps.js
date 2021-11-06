const router = require("express").Router();

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius } = require("../controllers/bootcamps");

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