const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 30 },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: "You must enter a valid URL",
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator(v) {
          return validator.isURL(v);
        },
        message: "You must enter a valid URL",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
