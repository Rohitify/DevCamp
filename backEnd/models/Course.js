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
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }
});

CourseSchema.statics.getAverageCost = async function(bootcampId) {
  console.log("Calculating avg cost...");

  const obj = await this.aggregate([
    {
      $match: { bootcamp : bootcampId }
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" }
      }
    }
  ]);

  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost /10) * 10
    });
  } catch (err) {
    console.error(err);
  }
}

CourseSchema.post("save", function() {
  this.constructor.getAverageCost(this.bootcamp);
});

CourseSchema.pre("remove", function() {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model("course", CourseSchema);