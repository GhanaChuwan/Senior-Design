const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

exports.createUser =  async (req, res) => {
    const {firstName, lastName, email, password} = req.body;


    const isNewUser = await User.findOne({email});
    console.log(isNewUser)


    if(isNewUser != null)
        return res.json({success:false, message:'This email is already in use, try sign-in'});

    const user = await User.create({firstName, lastName, email, password});
    const token = jwt.sign({userId: user._id }, process.env.JWT_SECRET);

    return res.json({success:true,user, token:token});
};

exports.userSignIn = async (req, res) => {
  const {email, password} = req.body;
  console.log(email)

  const user = await User.findOne({email});

  if(!user)
      return res.json({
          success: false,
          message:'user not found, with the given email!',});

  const isMatch =  await user.comparePassword(password);
  if(!isMatch)
      return  res.json({
          success: false,
          message:'email/ password does not match!',});

  const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);


  const userInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
  }
  res.json({success:true, user: userInfo, token})
};





