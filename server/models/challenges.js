const mongoose = require("mongoose");


const challengesSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    emblem: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    completed: {
        type: Boolean,
        required: true,

    },
    createdBy: {
        type: String,
        required: true,
    },
    currentAmount: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true
    },
    badges: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Challenges", challengesSchema);
