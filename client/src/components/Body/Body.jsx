import React from 'react'
import './Body.css'

const Body = () => {
  return (
    <div>
      <section className="hero">
  <h1>Organize Your Work. Boost Your Productivity.</h1>
  <p>
    TaskMaster helps you manage your daily tasks, track progress, and stay focused — all in one place.
  </p>

</section>

<section className="features">
  <div className="feature">
    <h3>✅ Create & Manage Tasks</h3>
    <p>Quickly add, edit, and organize your tasks with clean and intuitive controls.</p>
  </div>

  <div className="feature">
    <h3>📅 Set Deadlines & Reminders</h3>
    <p>Never miss a task with automatic reminders and due-date tracking.</p>
  </div>

  <div className="feature">
    <h3>📊 Track Your Progress</h3>
    <p>Visualize your task completion and productivity stats over time.</p>
  </div>
</section>

    </div>
  )
}

export default Body
