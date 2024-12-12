import model from "./model.js";
export const createResume = async (resume) => {
  delete resume._id;

  return model.create(resume);
};
export const findAllResumes = async () => {
  return model.find();
};
export const findResumesByCity = (city) => {
  return model.find({ "generalInfo.city": city });
};

export const findResumeByUniversity = (university) => {
  return model.find({ "education.university": university });
};
export const findResumeByMajor = (major) => {
  return model.find({ "education.major": major });
};
export const findResumeByConcentration = (concentration) => {
  return model.find({ "education.concentration": concentration });
};
export const findResumeByGpa = (gpa) => {
  return model.find({ "education.gpa": gpa });
};
export const findResumesByLanguageLevel = (language, level) => {
  if (level === "familiar") {
    return model.find({
      "programmingLanguages.name": language,
      "programmingLanguages.proficiency": {
        $in: ["familiar", "well-versed", "expert"],
      },
    });
  } else if (level === "well-versed") {
    return model.find({
      "programmingLanguages.name": language,
      "programmingLanguages.proficiency": { $in: ["well-versed", "expert"] },
    });
  } else {
    return model.find({
      "programmingLanguages.name": language,
      "programmingLanguages.proficiency": "expert",
    });
  }
};
export const findResumesByTechnologyLevel = (technology, level) => {
  if (level === "familiar") {
    return model.find({
      "technologies.name": technology,
      "technologies.proficiency": {
        $in: ["familiar", "well-versed", "expert"],
      },
    });
  } else if (level === "well-versed") {
    return model.find({
      "technologies.name": technology,
      "technologies.proficiency": { $in: ["well-versed", "expert"] },
    });
  } else {
    return model.find({
      "technologies.name": technology,
      "technologies.proficiency": "expert",
    });
  }
};
export const findResumesByEmployer = (employer) => {
  return model.find({ "employment.name": employer });
};
export const findResumesByRole = (role) => {
  return model.find({ "employment.role": role });
};
export const deleteResume = async (resumeId) => {
  return model.findByIdAndDelete(resumeId);
};
export const updateResume = async (userId, resume) => {
  return model.updateOne({ user: userId }, resume);
};
export const findTotalResumeCount = async () => {
  return model.countDocuments();
};
export const findResumeByUserId = async (userId) => {
  return model.findOne({ user: userId });
};
export const findResumeByEmail = async (email) => {
  return model.findOne({ "generalInfo.email": email });
};
