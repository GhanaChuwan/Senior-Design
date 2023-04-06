const { makeCsvData } = require("../utils/downloadData.js");
const emailSender = require("../utils/sendDownloadMail.js");

exports.downloadProgress = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const data = await makeCsvData();
    const didSend = await emailSender.sendDownloadMail({ email: email, data });

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
