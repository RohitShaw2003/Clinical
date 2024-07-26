const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Database Connection Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
