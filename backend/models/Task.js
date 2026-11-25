
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },

    description: {
      type: String,
      default: "",
      maxlength: 1000
    },

    category: {
      type: String,
      enum: ["Work", "Personal", "Study", "Other"],
      default: "Personal"
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    completed: {
      type: Boolean,
      default: false
    },

    dueDate: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
