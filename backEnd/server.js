const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const fileupload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require('./middleware/error');
const connectDB = require("./config/db");

// Routes 
const bootcampsRoutes = require("./routes/bootcamps");
const coursesRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const reviewsRoutes = require("./routes/reviews");

//Load ENV variables
dotenv.config({ path : "../config/config.env" });

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

// Sanitize data from NoSQL Injection  { "username": {"$gt": ""}, "password": {"$gt": ""} }
app.use(mongoSanitize());

// Set security headers 
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "img-src": ["'self'", "https: data:"]
  }
}));

// stop html tag in data to prevent XSS Attacks
app.use(xss());

// Rate limiting on api calls in general
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10mins
  max: 200
});

app.use(limiter);

// Prevent http param pollution 
app.use(hpp());

// Enable CORS for others domain to use public api 
app.use(cors());

console.log(__dirname); 
// Set static folder 
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/bootcamps", bootcampsRoutes);
app.use("/api/v1/courses", coursesRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/reviews", reviewsRoutes);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

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
