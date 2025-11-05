const mongoose = require("mongoose");
require("dotenv").config();
let isConnected = false;

async function connect() {
  if (isConnected) {
    console.log("🟢 Using existing MongoDB connection");
    return;
  }

  const uri = process.env.MONGODB_URL;
  if (!uri) {
    console.error("❌ MONGODB_URI is missing in environment variables");
    throw new Error("Missing MONGODB_URI");
  }

  try {
    const db = await mongoose.connect(uri);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err
  } 
}

module.exports = { connect };
