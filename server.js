const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("MongoDB Connected"));

// Define User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", userSchema);

// API Endpoint to Fetch Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users); // Send users as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
