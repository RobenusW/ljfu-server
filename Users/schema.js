import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["talent", "business"], required: true },
    businessName: { type: String },
    views: { type: Number, default: 0 },
  },
  { collection: "users" }
);
export default userSchema;
