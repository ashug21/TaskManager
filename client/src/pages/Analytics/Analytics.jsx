import React, { useEffect, useState } from "react";
import "./Analytics.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

const Analytics = () => {
  const [totaltasks, setTotalTasks] = useState("");
  const [completed, setCompleted] = useState("");
  const [pending, setPending] = useState("");
 

  const getTotalTasks = async () => {
    try {
      const res = await axios.get("http://localhost:9000/analytics/total");
      setTotalTasks(res.data.total);
      setCompleted(res.data.completed);
      setPending(res.data.pending);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    getTotalTasks();
  }, []);

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
              Task Completed: <span>{completed}</span>
            </p>
            <p className="analytics1-item pending">
              Pending Tasks: <span>{pending}</span>
            </p>
          </div>

        </div>



        <div className="progress-container1">
          <p>Task Completion Rate</p>
          <div className="progress-bar1">
            <div
              className="progress-fill1"
              style={{ width: `${(completed / totaltasks) * 100}%` }}
            ></div>
          </div>
          <p>{Math.round((completed / totaltasks) * 100)}% completed</p>
        </div>
      </div>

    <br/> <br/> <br/>
    <div className="gap"></div>
      <Footer/>
    </div>
  );
};

export default Analytics;
