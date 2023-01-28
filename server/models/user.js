const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const buffer = require("buffer");
const {Schema} = require("mongoose");

// const User = {
//     firstName:'',
//     lastName:'',
//     email:'',
//     createPassword:'',
//     confirmPassword:''
// }

const userSchema = new mongoose.Schema({
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        subjects:{
            type:[Schema.Types.ObjectId],
            default:[],
            required:false
        },
        avater:{
            type:String,
            required:false,
        }
});

userSchema.pre('save', function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash) => {
            if(err) return next(err);

            this.password = hash;
            next();
        })
    }
})

userSchema.methods.comparePassword = async function(password) {
    console.log(password)
    if(!password) throw new Error('Password is mission, can not compare!');

    try{
        const result = await bcrypt.compare(password, this.password);
        return result;

    }catch (error) {
        console.log('Error while comparing password!', error.message);

    }
}

userSchema.statics.isThisEmailInUse = async function(email) {
   if(!email)  throw new Error('Invalid Email');
    try{
       const user = await this.findOne({email})
       if(user) return false

       return true;
   }catch (error) {
       console.log('error inside isThisEmailInUse Method', error.message)
       return false;
   }


}

module.exports = mongoose.model('User', userSchema)
