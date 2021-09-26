import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
  email: string;
  avatar: string;
  name: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model<UserDocument>("User", UserSchema);
