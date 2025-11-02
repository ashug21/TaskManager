import React, { useEffect, useState } from "react";
import "./MyTask.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import DeleteIcon from "../../assets/bin.png";
import Footer from "../../components/Footer/Footer";
import toast, { Toaster } from "react-hot-toast";

const taskDeleted = () => toast.success("Task deleted successfully");

const MyTask = () => {
  const [data, setData] = useState([]);

  const API_BASE = "https://taskmanager-7sxx.onrender.com/taskmanager";

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/gt`);
      setData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const alterStatus = async (id) => {
    try {
      await axios.put(`${API_BASE}/ut/${id}`);
      fetchData(); // Refresh after change
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/dt/${id}`);
      fetchData();
      taskDeleted();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mytask-container">
      <Navbar />
      <Toaster position="top-right" />

      <div className="tasks-wrapper">
        <div className="tasks-grid">
          {data.length > 0 ? (
            data.map((item) => (
              <div key={item._id} className="task-card">
                {/* Delete Icon */}
                <div className="icon-container">
                  <img
                    src={DeleteIcon}
                    alt="delete"
                    className="delete-icon"
                    onClick={() => deleteTask(item._id)}
                  />
                </div>

                <h3 className="task-title">{item.title}</h3>
                <p className="task-subtitle">{item.subtitle}</p>
                <p className="task-category">{item.category}</p>
                <p className="task-description">{item.description}</p>

                <div className="task-deadline">
                  <span>Deadline:</span>
                  <p>
                    {typeof item.deadline === "string"
                      ? item.deadline
                      : new Date(item.deadline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                  </p>
                </div>

                <div className="task-status">
                  <span>Change Status:</span>
                  <button
                    onClick={() => alterStatus(item._id)}
                    className={item.status ? "done" : "pending"}
                  >
                    {item.status ? "✅ Done" : "❌ Pending"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-task-text">No tasks available</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyTask;
