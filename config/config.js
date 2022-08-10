const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb Connected to ${conn.connection.host}`.bgYellow.white);
  } catch (error) {
    console.error(`Error : ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

module.exports = connectDB;
