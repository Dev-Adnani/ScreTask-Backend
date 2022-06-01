import mongoose, { Document } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
}

const schema = new mongoose.Schema({
    email: {
    type: String,
    unique: true,
    required: true,
  },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const UserInfo = mongoose.model<User>("user", schema);

export default UserInfo;