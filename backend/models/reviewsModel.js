const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    User: {
      type: String,
      required: [true, "Please enter user name"],
    },

    Stars: {
      type: Number,
      required: true,
      default: 1,
    },

    reviewText: {
      type: String,
      required: false,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ReviewSchema;
