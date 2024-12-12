import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config";
import cors from "cors";
import UserRoutes from "./Users/routes.js";
import ResumeRoutes from "./Resumes/routes.js";
import OpenAIRoutes from "./OpenAI/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "ljfu",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
ResumeRoutes(app);
OpenAIRoutes(app);
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
