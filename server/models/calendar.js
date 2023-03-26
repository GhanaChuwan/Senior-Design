const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  eventNote: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },


});

module.exports = mongoose.model("CalendarPage", calendarSchema);
