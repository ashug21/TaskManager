require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const TaskRoutes = require('./routes/Task');
const UserRoutes = require('./routes/User');
const AnalyticsRoutes = require('./routes/Analytics');
const { connectDB } = require('./connect');
const cors = require('cors');

// ==================== CONFIG ====================
const PORT = process.env.PORT || 9000;

// CORS Setup — allow both localhost (for testing) and your live Vercel site
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||                              // allow tools like Postman
        origin.includes("localhost") ||         // allow local testing
        origin.includes("vercel.app")           // allow any Vercel preview or production domain
      ) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== ROUTES ====================
app.use('/taskmanager', TaskRoutes);
app.use('/user', UserRoutes);
app.use('/analytics', AnalyticsRoutes);

// ==================== MONGODB CONNECTION ====================
connectDB(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err.message));

// ==================== DEFAULT ROUTE ====================
app.get('/', (req, res) => {
  res.send("✅ Task Manager Backend is Running Successfully!");
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
