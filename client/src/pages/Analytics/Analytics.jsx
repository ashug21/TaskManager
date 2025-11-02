import React, { useEffect, useState } from "react";
import "./Analytics.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { api } from "../../../api"; // ✅ Correct import

const Analytics = () => {
  const [totaltasks, setTotalTasks] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  const getTotalTasks = async () => {
    try {
      // ✅ Using preconfigured axios instance
      const res = await api.get("/analytics/total");
      if (res.data) {
        setTotalTasks(res.data.total ?? 0);
        setCompleted(res.data.completed ?? 0);
        setPending(res.data.pending ?? 0);
      } else {
        console.error("Invalid analytics data:", res.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getTotalTasks();
  }, []);

  const completionRate =
    totaltasks > 0 ? Math.round((completed / totaltasks) * 100) : 0;

  return (
    <div>
      <Navbar />

      <div className="analytics1-container">
        <div className="analytics1-card">
          <h2 className="analytics1-title">Task Analytics</h2>

          <div className="analytics1-stats">
            <p className="analytics1-item total">
              Total Tasks: <span>{totaltasks}</span>
            </p>
            <p className="analytics1-item completed">
              Completed: <span>{completed}</span>
            </p>
            <p className="analytics1-item pending">
              Pending: <span>{pending}</span>
            </p>
          </div>
        </div>

        <div className="progress-container1">
          <p>Task Completion Rate</p>
          <div className="progress-bar1">
            <div
              className="progress-fill1"
              style={{
                width: `${completionRate}%`,
              }}
            ></div>
          </div>
          <p>{completionRate}% completed</p>
        </div>
      </div>

      <div className="gap"></div>
      <Footer />
    </div>
  );
};

export default Analytics;
