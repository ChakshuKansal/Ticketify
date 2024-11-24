const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // To ensure emails are not duplicated
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model using the schema
const User = mongoose.model("User", UserSchema);
module.exports = User;
