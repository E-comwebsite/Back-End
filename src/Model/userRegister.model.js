const mongoose = require("mongoose");
const { v4 } = require("uuid");

const SignUpSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
});

const SignUp = mongoose.model("Register", SignUpSchema);

module.exports = SignUp;
