const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    titleName:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    officeHours:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Resources', resourceSchema)