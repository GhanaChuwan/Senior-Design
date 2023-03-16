const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const generateHTML = require("./generateEmailHTML.js");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

exports.sendMail = async (email, subject, text, name) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: subject,
      html: generateHTML.HTMLGenerator({
        name: name,
        link: text,
      }),
    });
    console.log(response);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
