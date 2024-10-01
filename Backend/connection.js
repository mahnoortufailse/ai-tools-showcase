const mongoose = require("mongoose");

async function connectMongoDB(url) {
  return await mongoose.connect(url);
}

// Correct way to export it
module.exports = connectMongoDB;  // Change this to export the function directly
