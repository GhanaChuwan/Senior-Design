const mongoose = require("mongoose");

const activitySessionSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("ActivitySession", activitySessionSchema);
