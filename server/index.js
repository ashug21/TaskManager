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

const PORT = 9000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "https://taskmanager-frontend.vercel.app"], // replace with your actual Vercel URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.use('/taskmanager', TaskRoutes);
app.use('/user', UserRoutes);
app.use('/analytics', AnalyticsRoutes);

// MongoDB Connection
connectDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB Connection Error:", err.message));

// Default Route
app.get('/', (req, res) => {
  res.render("Home");
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
