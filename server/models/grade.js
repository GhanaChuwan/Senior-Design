const mongoose = require('mongoose');

const gradeActivity = new mongoose.Schema({
    gradeName: {
        type: String,
        required: true
    },
    gradeType: {
        type: String,
        required: true
    },
    gradePoints: {
        type: String,
        required: true
    },
    gradeSubject: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model('Grade', gradeActivity)