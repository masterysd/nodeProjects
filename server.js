const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cors = require('cors')

app.use(cors(
    {
        origin: "http://localhost:5173"
    }
))
// Routes
const routes = require("./routes/routes");

app.use(express.json());

// Middleware to handle JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Invalid JSON payload:", err.message);
    return res.status(400).send({ error: "Invalid JSON format" });
  }
  next();
});

// Attach routes
app.use(routes);

// Start server
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
