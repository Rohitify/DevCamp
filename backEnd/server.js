const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require('./middleware/error');
const connectDB = require("./config/db");

// Routes 
const bootcampsRoutes = require("./routes/bootcamps");
const coursesRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

//Load ENV variables
dotenv.config({ path : "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Body Parser 
app.use(express.json());

// Cookie Parser 
app.use(cookieParser());

// Dev logging middleware
if(process.env.NODE_ENV === "development"){
  app.use(morgan("dev"));
}

// File Upload 
app.use(fileupload());

// Set static folder 
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/bootcamps", bootcampsRoutes);
app.use("/api/v1/courses", coursesRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);

app.use(errorHandler);

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