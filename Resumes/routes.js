import * as resumeDao from "./dao.js";

export default function ResumeRoutes(app) {
  const findAllResumes = async (req, res) => {
    try {
      const resumes = await resumeDao.findAllResumes();
      res.status(200).json(resumes);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const findResumesByCity = async (req, res) => {
    const city = req.params.city;
    try {
      const resumes = await resumeDao.findResumesByCity(city);
      res.status(200).json(resumes);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const findResumeByUniversity = async (req, res) => {
    const university = req.params.university;
    try {
      const resumes = await resumeDao.findResumeByUniversity(university);
      res.status(200).json(resumes);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const findResumeByMajor = async (req, res) => {
    const major = req.params.major;
    try {
      const resumes = await resumeDao.findResumeByMajor(major);
      res.status(200).json(resumes);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const findResumeByConcentration = async (req, res) => {
    const concentration = req.params.concentration;
    try {
      const resumes = await resumeDao.findResumeByConcentration(concentration);
      res.status(200).json(resumes);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const findResumeByGpa = async (req, res) => {
    const gpa = req.params.gpa;
    try {
      const resumes = await resumeDao.findResumeByGpa(gpa);
      res.status(200).json(resumes);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const findResumesByLanguageLevel = async (req, res) => {
    const { language, level } = req.params;
    try {
      const resumes = await resumeDao.findResumesByLanguageLevel(
        language,
        level
      );
      res.status(200).json(resumes);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const findResumesByTechnologyLevel = async (req, res) => {
    const { technology, level } = req.params;
    try {
      const resumes = await resumeDao.findResumesByTechnologyLevel(
        technology,
        level
      );
      res.status(200).json(resumes);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  const findResumesByEmployer = async (req, res) => {
    const employer = req.params.employer;
    try {
      const resumes = await resumeDao.findResumesByEmployer(employer);
      res.status(200).json(resumes);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  const findResumeByRole = async (req, res) => {
    const role = req.params.role;
    try {
      const resumes = await resumeDao.findResumeByRole(role);
      res.status(200).json(resumes);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  const deleteResume = async (req, res) => {
    const resumeId = req.params.resumeId;
    try {
      await resumeDao.deleteResume(resumeId);
      res.status(204).send("Resume deleted");
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  const updateResume = async (req, res) => {
    const { userId } = req.params;
    const resume = req.body;
    try {
      const updatedResume = await resumeDao.updateResume(userId, resume);
      res.status(200).json(updatedResume);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  const findTotalResumeCount = async (req, res) => {
    try {
      const count = await resumeDao.findTotalResumeCount();
      res.status(200).json(count);
    } catch (error) {
      res.status(401).send(error.message);
    }
  };
  const findResumeByEmailAddress = async (req, res) => {
    const { email } = req.params;
    try {
      const resume = await resumeDao.findResumeByEmail(email);
      res.status(200).json(resume);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  app.get("/api/resumesUser/email/:email", findResumeByEmailAddress);
  app.delete("/api/resumes/:resumeId", deleteResume);
  app.put("/api/resumes/:userId", updateResume);
  app.get("/api/resumesCollect/count", findTotalResumeCount);
  app.get("/api/resumes", findAllResumes);
  app.get("/api/resumes/city/:city", findResumesByCity);
  app.get("/api/resumes/university/:university", findResumeByUniversity);
  app.get("/api/resumes/major/:major", findResumeByMajor);
  app.get(
    "/api/resumes/concentration/:concentration",
    findResumeByConcentration
  );
  app.get("/api/resumes/gpa/:gpa", findResumeByGpa);
  app.get("/api/resumes/language/:language/:level", findResumesByLanguageLevel);
  app.get(
    "/api/resumes/technology/:technology/:level",
    findResumesByTechnologyLevel
  );
  app.get("/api/resumes/employer/:employer", findResumesByEmployer);
  app.get("/api/resumes/role/:role", findResumeByRole);
}
