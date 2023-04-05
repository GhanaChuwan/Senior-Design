const emailSender = require("../utils/sendDownloadMail.js");

exports.downloadProgress = async (req, res) => {
  const { email } = req.body;
  try {
    const didSend = await emailSender.sendDownloadMail(
      email,
      "Download Progress"
      //user.name
    );
    if (didSend) {
      return res.status(200).json({
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
