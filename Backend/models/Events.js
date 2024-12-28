const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "Online",
      trim: true,
    },
    price: {
      type: Number,
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
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    }, 
    status: { type: String, default: 'active' },
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", EventSchema);
module.exports = Events;
