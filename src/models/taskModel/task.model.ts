import mongoose, { Document } from "mongoose";

//Tasks Schema
export interface Task extends Document {
  task_id: string;
  user_id : string;
  task_title: string;
  task_desc: string;
  task_type:string;
  task_date : string;
  task_completed: Boolean;
}

const schema = new mongoose.Schema({
    task_id: {
    type:String,
    unique: true,
    required: true,
  },
  user_id: {
    type:String,
    required: true,
  },
  task_title: { type: String, required: true  },
  task_desc: { type: String ,required: true },
  task_type: { type: String, required: true },
  task_date: { type:String ,required: true },
  task_completed: { type: Boolean, required: true },
},);

const TaskInfo = mongoose.model<Task>("task", schema);

export default TaskInfo;