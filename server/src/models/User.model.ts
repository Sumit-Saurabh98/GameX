import mongoose, {Document} from "mongoose";

export interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
});

const User = mongoose.model<UserInterface>("User", userSchema);

export default User;
