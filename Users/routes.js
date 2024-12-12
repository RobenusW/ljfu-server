import * as userDao from "./dao.js";
import {
  createResume as createResumeForUser,
  findResumeByUserId as findOneResumeByUserId,
} from "../Resumes/dao.js";

export default function UserRoutes(app) {
  const signup = async (req, res) => {
    const user = await userDao.findUserByEmail(req.body.email);
    if (user) {
      res.status(409).send("Email already exists");
      return;
    }
    const newUser = await userDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const createResume = async (req, res) => {
    const { userId } = req.params;
    const resume = { ...req.body, user: userId };
    try {
      const newResume = await createResumeForUser(resume);
      res.status(201).json(newResume);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  const findUserById = async (req, res) => {
    const user = await userDao.findUserById(req.params.userId);
    res.json(user);
  };
  const findAllBusinesses = async (req, res) => {
    const businesses = await userDao.findAllBusinesses();
    res.json(businesses);
  };
  const findAllTalents = async (req, res) => {
    const talents = await userDao.findAllTalents();
    res.json(talents);
  };
  const findTalentByPartialName = async (req, res) => {
    const talents = await userDao.findTalentByPartialName(
      req.query.partialName
    );
    res.json(talents);
  };
  const findUserByCredentials = async (req, res) => {
    const user = await userDao.findUserByCredentials(req.query);
    res.json(user);
  };
  const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userDao.findUserByCredentials(email, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.status(401).send("Invalid credentials");
    }
  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).send("Please login");
      return;
    }
    res.json(currentUser);
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const findResumeByUserId = async (req, res) => {
    const { userId } = req.params;
    const resume = await findOneResumeByUserId(userId);
    res.json(resume);
  };

  app.post("/api/resumes/:userId", createResume);
  app.get("/api/resumes/:userId", findResumeByUserId);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/dashboard/businesses", findAllBusinesses);
  app.get("/api/alltalent", findAllTalents);
  app.get("/api/users/talents/search", findTalentByPartialName);
  app.get("/api/users/login", findUserByCredentials);
  app.get("/api/users/profile", profile);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
}
