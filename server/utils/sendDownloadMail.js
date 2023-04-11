const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const generateHTML = require("./generateProgressHTML.js");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

exports.sendDownloadMail = async (email, data) => {
  try {
    const encoder = new TextEncoder();
    const csvEncoded = encoder.encode(data);
    // Convert UTF-8 encoded CSV content to base64 encoding
    const base64Content = btoa(String.fromCharCode.apply(null, csvEncoded));

    const response = await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Progress Download",
      attachments: [
        {
          // use URL as an attachment
          filename: "Progress.csv",
          path: `data:text/csv;base64,${base64Content}`,
        },
      ],
    });
    console.log(response);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
