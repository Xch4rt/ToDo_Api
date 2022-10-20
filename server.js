// Packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");

const errorHandler = require("./middlewares/errorHandler");
const verifyToken = require("./middlewares/auth");

/* This is the swagger documentation setup. */
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

// Multer
const multer = require("multer");
const upload = multer();

// Load env variables
dotenv.config({ path: ".env" });

// Initialize app
const app = express();

//Enable cors
app.use(cors({}));

// Route files
const welcomeRoute = require('./routes/welcome');
const authRoute = require("./routes/auth");
const ToDo = require('./routes/todo');
const user = require('./routes/user');
const task = require('./routes/task');
// Body paser
app.use(express.json({ limit: "20mb" }));

// Development setup
if (process.env.NODE_ENV == "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

/* This is the swagger documentation setup. */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));



// Mount routes
app.use("/api/v1/", welcomeRoute);
app.use("/api/v1/auth",authRoute);
app.use('/api/v1/todo',verifyToken,ToDo);
app.use('/api/v1/user', user);
app.use('/api/v1/task',verifyToken, task);

// Middlewares
app.use(errorHandler);

// Multer
app.use(upload.any());

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .blue
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});