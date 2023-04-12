const { makeCsvData } = require("../utils/downloadData.js");
const emailSender = require("../utils/sendDownloadMail.js");
const User = require("../models/user.js");
exports.downloadProgressLink = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    const data = await makeCsvData();

    const didSend = await emailSender.sendDownloadMail(email, data);

    if (didSend) {
      return res.status(200).json({
        email,
        message: "Progress files sent to your email account",
      });
    } else {
      return res.status(400).json({
        message: " Progress files link was not sent.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
