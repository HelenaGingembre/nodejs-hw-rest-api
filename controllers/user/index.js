const getCurrentUser = require("./getCurrentUser");
const logout = require("./logout");
const getContactsUser = require("./getContactsUser");
const addContactUser = require("./addContactUser");
const uploadAvatar = require("./newAvatar");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  getCurrentUser,
  logout,
  getContactsUser,
  addContactUser,
  uploadAvatar,
  resendVerifyEmail,
};
