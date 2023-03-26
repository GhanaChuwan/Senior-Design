const mongoose = require("mongoose");

const passwordChangeTokenSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
});
module.exports = mongoose.model(
  "PasswordChangeToken",
  passwordChangeTokenSchema
);
