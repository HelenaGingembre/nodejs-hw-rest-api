const { models } = require("mongoose");
const { User } = require("../models/user");

const getAllContactsUser = async ({ user }) => {
  const userId = user._id;
  console.log("userId", userId);
  const allContactsUser = await User.findById(userId).populate("contacts", {
    phone: 1,
    email: 1,
    _id: 1,
  });
  return allContactsUser;
};

module.exports = { getAllContactsUser };
