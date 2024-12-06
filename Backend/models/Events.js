const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    eventCat: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", EventSchema);
module.exports = Events;