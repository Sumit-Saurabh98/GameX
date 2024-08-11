import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  roles: { type: [String], enum: ["admin", "user", "moderator"], default: "user" },
  refreshToken: { type: String, default: "" },
  businessType: { type: String, default: "" },
  gstNumber: { type: String, default: "" },
  profileImage: { type: String, default: "" },

}, {
  timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;