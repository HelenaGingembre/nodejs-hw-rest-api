const path = require("path");

const { User } = require("../../models/user");
// const { HttpError } = require("../../helpers/index");

const direFile = path.join(__dirname, "../../", "public", "avatars");
console.log(direFile);

const newAvatar = async (req, res) => {
  console.log("avatar", direFile);
};

module.exports = newAvatar;
