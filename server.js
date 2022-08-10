const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const color = require("colors");
const connectDB = require("./config/config");
//dotenv config
const dotenv = require("dotenv");
dotenv.config();
//db connection
connectDB();
//rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//listining on port
app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`.bgGreen.white);
});
