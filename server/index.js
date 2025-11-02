require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectDB } = require("./connect");

// Route imports
const TaskRoutes = require("./routes/Task");
const UserRoutes = require("./routes/User");
const AnalyticsRoutes = require("./routes/Analytics");

const app = express();
const PORT = process.env.PORT || 9000;

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://task-manager-two-lovat-91.vercel.app" // Your actual Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ View Engine (EJS)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// ✅ Routes
app.use("/taskmanager", TaskRoutes);
app.use("/user", UserRoutes);
app.use("/analytics", AnalyticsRoutes);

// ✅ Default Home Route
app.get("/", (req, res) => {
  res.render("Home");
});

// ✅ MongoDB Connection
connectDB(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ✅ Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
