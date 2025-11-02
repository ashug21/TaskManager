import React, { useState } from "react";
import "./AddTask.css";
import Navbar from "../../components/Navbar/Navbar";
import { Categories } from "../../assets/TaskAssets";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import toast, { Toaster } from "react-hot-toast";

const Newtask = () => toast.success("Task Added Successfully");

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setCheckBox] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://taskmanager-7sxx.onrender.com/taskmanager/at", {
        title,
        subtitle,
        category,
        description,
        deadline,
        status,
      });
      Newtask();

      setTitle("");
      setSubTitle("");
      setCategory("");
      setDescription("");
      setDeadline("");
      setCheckBox(false);
    } catch (error) {
      toast.error("Error adding task. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />
      <div className="add-task-container">
        <form className="add-task-form" onSubmit={handleSubmit}>
          <h2 className="form-heading">Add New Task</h2>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              id="title"
              placeholder="Enter task title"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subtitle">Subtitle</label>
            <input
              onChange={(e) => setSubTitle(e.target.value)}
              value={subtitle}
              type="text"
              id="subtitle"
              placeholder="Enter task subtitle"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {Categories.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              placeholder="Write task description..."
              className="form-textarea"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              onChange={(e) => setDeadline(e.target.value)}
              value={deadline}
              id="deadline"
              placeholder="Enter deadline (e.g. 05/11/2025 or Tomorrow)"
              className="form-deadline"
            ></input>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="status"
              onChange={(e) => setCheckBox(e.target.checked)}
              checked={status}
            />
            <label htmlFor="status">Mark as Completed</label>
          </div>

          <button type="submit" className="submit-btn">
            Add Task
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddTask;
