const mongoose = require("mongoose");

const activitySessionSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },

  createdBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ActivitySession", activitySessionSchema);
