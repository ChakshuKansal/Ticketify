const mongoose = require("mongoose");
const SubSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Subs = mongoose.model("Subs", SubSchema);
module.exports = Subs;
