import mongoose, { Document } from "mongoose";

export interface User extends Document {
  id:string;
  name:string;
  photo:string;
  email:string;
  password: string;
}

const schema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: { type: String, required: true },
  photo: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
},);

const UserInfo = mongoose.model<User>("user", schema);

export default UserInfo;