const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
mongoose.set("strictQuery", false);
const cors = require("cors");

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Parse incoming JSON requests
app.use(express.json());

// Serve the favicon
app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico")));

// Middleware to handle JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Invalid JSON payload:", err.message);
    return res.status(400).send({ error: "Invalid JSON format" });
  }
  next();
});

// Routes
const routes = require("./routes/routes");
app.use(routes);

// Default route to handle the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the API. Use /student or /trips for specific routes.");
});

// Middleware for handling undefined routes
app.use((req, res) => {
  res.status(404).send({ error: "Route not found" });
});

// Start the server
app.listen(9992, (err) => {
  if (err) {
    console.log("Error starting the server:", err);
  } else {
    console.log("Server started on port 9992");
  }
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/abc", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
