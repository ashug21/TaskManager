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


const PORT = process.env.PORT || 9000;


app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||                             
        origin.includes("localhost") ||       
        origin.includes("vercel.app")          
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


app.use('/taskmanager', TaskRoutes);
app.use('/user', UserRoutes);
app.use('/analytics', AnalyticsRoutes);


connectDB(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err.message));


app.get('/', (req, res) => {
  res.send("✅ Task Manager Backend is Running Successfully!");
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
