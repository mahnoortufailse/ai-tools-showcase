const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const connectMongoDB = require("./connection.js");
const cors = require("cors");
const globalErrorHandler = require("./controller/errorController.js");
const { config } = require("cloudinary");
const imageGenerationRoute = require("./route/imageGenerationRoute.js");
const IconGenerationRoute = require("./route/IconGenerationRoute.js");
const BG_RemovalRoute = require("./route/BG_RemovalRoute.js"); // Import the route properly
const MockupNewsRoute = require("./route/MockupNewsRoute.js");
const VideoGeneratorRoute = require("./route/VideoGeneratorRoute.js");
const pdf_generatorRoute = require("./route/pdf_generatorRoute.js");
dotenv.config();
const cloudinary = require("cloudinary").v2;
const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.MongoDBURL;
const userRoute = require("./route/user_route.js");
const rateLimit = require("express-rate-limit");
const path = require("path");

const helmet = require("helmet");
app.use(cors());




app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MongoDB
connectMongoDB(URL)
  .then(() => console.log("Connected Successfully"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB");
    console.error(err);
  });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

//Limit Request from same API
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour time window
  max: 200, // limit each IP to 200 requests per window (1 hour)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again after an hour", // Custom message for exceeding the limit
  statusCode: 429, // HTTP status code to send when rate limit is exceeded
});

app.use(limiter);

// Helmet to secure Express apps by setting various HTTP headers
app.use(helmet())
// Use routes
app.use("/", imageGenerationRoute);
app.use("/generate-icon", IconGenerationRoute);
app.use("/remove-bg", BG_RemovalRoute);
app.use("/generate-video", VideoGeneratorRoute); // Use the route correctly
app.use("/generate-pdf", pdf_generatorRoute);
// app.use('/uploads', express.static(path.join(__dirname, 'route', 'uploads')));
app.use("/mockupNews", MockupNewsRoute);
app.use('/uploads', express.static(path.join(__dirname,'route/uploads')));
app.use("/user", userRoute);
// Handle all other routes
app.all("*", (req, res, next) => {
  next(new AppError(`Page not found ${req.originalUrl}`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Create HTTP server and listen on the port
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection at:", err.message);
  server.close(() => {
    console.log("Server closed due to unhandled rejection");
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception at:", err.message);
  server.close(() => {
    console.log("Server closed due to uncaught exception");
    process.exit(1);
  });
});
