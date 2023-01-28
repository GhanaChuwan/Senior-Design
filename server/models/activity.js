const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activity:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:new Date(),
    }
})

module.exports = mongoose.model('Activity', activitySchema)