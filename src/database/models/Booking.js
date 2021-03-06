const { Schema, model } = require("mongoose");

const BookingSchema = new Schema({
  club: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  courtType: {
    type: String,
    enum: ["Indoor", "Outdoor"],
    required: true,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
      required: true,
    },
  ],
  open: {
    type: Boolean,
    default: true,
    required: true,
  },
});

const Booking = model("Booking", BookingSchema, "bookings");

module.exports = Booking;
