import React from 'react';
import './Testimonals.css'

const Testimonials = () => {
  const testimonials = [
    {
      message: "TaskManager completely changed how I organize my day — it’s clean, simple, and surprisingly powerful.",
      author: "Priya Sharma",
      role: "UX Designer"
    },
    {
      message: "This really helps me alot to make my tasks all written at one place",
      author: "Rahul Mehta",
      role: "Project Manager"
    },
    {
      message: "It keeps me focused and accountable. My productivity has doubled since I started using it.",
      author: "Ananya Gupta",
      role: "Software Engineer"
    }
  ];

  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonial-list">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial">
            <p className="message">"{t.message}"</p>
            <h4 className="author">- {t.author}</h4>
            <p className="role">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
