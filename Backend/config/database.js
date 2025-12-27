const mongoose = require("mongoose");

const databaseConnect = async () => {
  try {
    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(process.env.CONNECTION_STRING); 
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    throw err;
  }
};

module.exports = databaseConnect;