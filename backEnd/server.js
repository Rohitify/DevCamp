const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Routes 
const bootcampsRoutes = require("./routes/bootcamps");

//Load ENV variables
dotenv.config({ path : "./config/config.env" });

// Connect to database
connectDB();

const app = express();

app.use(express.json());

// Dev logging middleware
if(process.env.NODE_ENV === "development"){
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcampsRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle the Unhandled Error 
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  // Close server
  server.close(() => process.exit(1));
});