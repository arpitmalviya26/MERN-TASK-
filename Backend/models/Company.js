const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  location: String,
  foundedOn: Date,
  averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Company", companySchema);
