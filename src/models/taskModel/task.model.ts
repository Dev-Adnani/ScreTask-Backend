import mongoose, { Document } from "mongoose";

export interface Task extends Document {
  task_id: number;
  user_id : string;
  task_title: string;
  task_desc: string;
  task_type:string;
  task_date : string;
  task_completed: Boolean;
}

const schema = new mongoose.Schema({
    task_id: {
    type:Number,
    unique: true,
    required: true,
  },
  user_id: {
    type:String,
    required: true,
  },
  task_title: { type: String, required: true  },
  task_desc: { type: String },
  task_type: { type: String, required: true },
  task_date: { type:String  },
  task_completed: { type: Boolean, required: true },
},);

const TaskInfo = mongoose.model<Task>("task", schema);

export default TaskInfo;