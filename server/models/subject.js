const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    activities: {
        type: [String],
        required: false,
        default: [],
    },
    grades: {
        type: [String],
        required: false,
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model("Subject", subjectSchema);