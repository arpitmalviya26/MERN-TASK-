const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    companyId: mongoose.Schema.Types.ObjectId,
    fullName: String,
    subject: String,
    reviewText: String,
    rating: { type: Number, min: 0, max: 5 , default: 2.5},
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
