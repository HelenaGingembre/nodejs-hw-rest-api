const path = require("path");
const fs = require("fs/promises");

const { User } = require("../../models/user");
// const { HttpError } = require("../../helpers/index");

const direFile = path.join(__dirname, "../../", "public", "avatars");
console.log(direFile);

const uploadAvatar = async (req, res, next) => {
  console.log("avatar req.file", res.file);

  return res.json({
    ok: true,
  });
};

module.exports = { uploadAvatar };
