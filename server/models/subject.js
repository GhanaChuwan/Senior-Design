const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    createdBy:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:new Date(),
    }
})

module.exports = mongoose.model('Subject', subjectSchema)