const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
    gradeName: {
        type: String,
        required: true,
    },
    gradeType: {
        type: String,
        required: true,
    },
    gradePoints: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Grade", gradeSchema);