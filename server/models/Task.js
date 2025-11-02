const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
        },

        subtitle : {
            type : String,
           
        },

        category : {
            type : String,
            required : true,
        },

        description : {
            type : String,
            required : true,
        },

        status : {
            type : Boolean,
            default : false,
        },

        deadline: {
            type: String,
          },

    },{timestamps : true});


const Task = mongoose.model('task' , TaskSchema);
module.exports = Task;