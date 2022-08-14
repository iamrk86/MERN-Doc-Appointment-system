const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: { type: String, required: [true, "email is required"] },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    seenNotification: {
      type: Array,
      default: [],
    },
    unseenNotification: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const userModle = mongoose.model("user", userSchema);

module.exports = userModle;
