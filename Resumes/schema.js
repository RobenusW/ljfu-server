import mongoose from "mongoose";

// Define the general info sub-schema
const generalInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  cityState: { type: String, required: true },
  email: { type: String, required: true },
  github: { type: String },
  portfolio: { type: String },
  additionalLinks: { type: String },
});

// Define the education sub-schema
const educationSchema = new mongoose.Schema({
  university: { type: String, required: true },
  major: { type: String, required: true },
  concentration: { type: String },
  gpa: { type: String },
  coursework: { type: String },
  awards: { type: String },
});

const programmingLanguagesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skillLevel: { type: String, required: true },
});

const technologiesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skillLevel: { type: String, required: true },
});

// Define the project sub-schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  links: [{ type: String }], // Array of links
  bulletPoints: [{ type: String }], // Array of bullet points
});

// Define the employment sub-schema
const employmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dates: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String },
  bulletPoints: [{ type: String }], // Array of bullet points
});

// Main user schema combining sub-schemas
const resumeSchema = new mongoose.Schema(
  {
    generalInfo: { type: generalInfoSchema, required: true },
    education: [educationSchema], // Array of education entries
    programmingLanguages: [programmingLanguagesSchema],
    technologies: [technologiesSchema],
    projects: [projectSchema], // Array of projects
    employment: [employmentSchema], // Array of employment entries
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "resumes" }
);

export default resumeSchema;
