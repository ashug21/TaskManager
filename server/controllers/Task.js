const express = require("express");
const Task = require("../models/Task");

const AddNewTask = async (req, res) => {
    try {
      const { title, subtitle, category, description, deadline, status } = req.body;
  
      if (!title || !category || !description) {
        return res.json({ success: false, message: "Missing required fields" });
      }
  
      const task = await Task.create({
        title,
        subtitle,
        category,
        description,
        deadline, 
        status,
      });
  
      res.json({ success: true, message: "New Task Added", task });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };
  

const GetTask = async(req,res) => {

    try {
        const data = await Task.find({}).sort({createdAt : -1});
        res.json(data);

    } catch (error) {
        res.json({success : false , message : error.message});
    }
  
}


const UpdateStatus = async(req,res) => {
    try{
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.json({ success: false, message: "Task not found" });
          }
          task.status = !task.status; 

          await task.save();

          res.status(200).json({success: true, message: "Task status updated successfully" ,updatedTask: task,
          });

    }
    catch(error){
        return res.json({ success: false, message: error.message });
    }
}

const DeleteTask = async(req,res) => {
    const {id} = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);

        if(!task){
            return res.json({ success: false, message: "Task not found" });
        }
        return res.json({ success: true, message: "Task deleted successfully" });
    } 
    catch (error) {
        res.json({success : false , message : error.message});
    }
}



module.exports = {
    AddNewTask,GetTask , UpdateStatus , DeleteTask
}