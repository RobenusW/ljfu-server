import model from "./model.js";

export const createUser = async (user) => {
  return model.create(user);
};
export const findUserById = async (userId) => {
  return model.findById(userId);
};
export const findAllBusinesses = async () => {
  return model.find({ role: "business" });
};
export const findAllTalents = async () => {
  return model.find({ role: "talent" });
};
export const findTalentByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};
export const findUserByCredentials = async (email, password) => {
  return model.findOne({ email: email, password: password });
};
export const findUserByEmail = async (email) => {
  return model.findOne({ email: email });
};
