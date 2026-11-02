
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const restaurantRoutes = require("./routes/restaurantRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// Homepage API
app.get("/", (req, res) => {
  res.send("Welcome to FoodieExpress API!");
});

// Test backend API
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "FoodieExpress backend is working!",
  });
});

// Test MySQL database connection
app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT DATABASE() AS database_name");

    res.json({
      success: true,
      message: "MySQL database connected successfully!",
      database: rows[0].database_name,
    });

  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to connect to the database.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`FoodieExpress server running on port ${PORT}`);
});
