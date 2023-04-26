const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const passwordResetTokenModal = require("../models/passwordRestToken.js");
const emailSender = require("../utils/sendMail");
const passwordResetUI = require("../passwordResetUI/index").passwordResetUI;
const challenges = require("./reward/rewards.js");
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const isNewUser = await User.findOne({ email });
  console.log(isNewUser);

  if (isNewUser != null)
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
  const hashedPassword = bcrypt.hash(password, 8);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  await challenges.createChallenges(user);
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return res.json({ success: true, user, token: token });
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: "user not found, with the given email!",
    });

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return res.json({
      success: false,
      message: "email / password does not match!",
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  console.log(user);

  const userInfo = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: user.id,
  };
  res.json({ success: true, user: userInfo, token });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    //invalid email
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      return res.status(400).json({ error: "Invalid email" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ error: "User with given email doesn't exist" });

    let token = await passwordResetTokenModal.findOne({
      userId: user._id,
    });
    if (!token) {
      token = await passwordResetTokenModal.create({
        userId: user._id,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET),
      });
    }

    const link =
      "http://www.localhost:80/forgot-password/" + `${user._id}/${token.token}`;

    const didSend = await emailSender.sendMail(
      email,
      "Password reset",
      link,
      user.name
    );
    console.log(link);
    if (didSend) {
      return res.status(200).json({
        message: "Password reset link sent to your email account",
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong. Reset email link was not sent.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.forgotPasswordUI = async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    if (!user)
      return res.send("<h1Invalid link or expired token</h1>").status(404);

    const token = await passwordResetTokenModal.findOne({
      userId: user._id.toString(),
      token: req.params.token,
    });

    res
      .send(passwordResetUI({ name: `${user.firstName} ${user.lastName}` }))
      .status(200);
  } catch (error) {
    res.send("<h1>ERROR 404</h1>").status(404);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findById(req.body.userId);
    if (!user)
      return res.status(400).json({ error: "Invalid link or expired token" });

    const token = await passwordResetTokenModal.findOne({
      userId: user._id.toString(),
      token: req.body.token,
    });
    const password = req.body.password;

    if (!token)
      return res.status(400).json({ error: "Invalid link or expired" });

    const hashedPassword = await bcrypt.hash(password, 8);
    user.password = hashedPassword;
    console.log({ pw: user.password });

    await user.save();
    console.log({ pw: user.password });
    await token.delete();

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(400).json({ error: "Invalid to change password" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};
