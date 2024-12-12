import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("ResumeModel", schema);
export default model;
