const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide course tilte"]
  },
  description: {
    type: String,
    required: [true, "Please provide Course description"]
  },
  weeks: {
    type: String,
    required: [true, "Please provide number of weeks"]
  },
  tuition: {
    type: String,
    required: [true, "Please provide Tuition cost"]
  },
  minimumSkill: {
    type: String,
    required: [true, "Please provide minimum skill"],
    enum: ["beginner", "intermediate", "advanced"]
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Data.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  }
});

module.exports = mongoose.model("course", CourseSchema);