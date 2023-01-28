const path = require("path");
const fs = require("fs/promises");
const { makeUploadAvatars, makeAvatarUrl } = require("../../helpers/paths");

const { User } = require("../../models/user");
// const { HttpError } = require("../../helpers/index");

const direFile = path.join(__dirname, "../../", "avatars");
console.log(direFile);

const uploadAvatar = async (req, res, next) => {
  console.log("avatar req.file", req.file);

  const { _id } = req.user;
  const { path: tmpPathUpload, originalname } = req.file;
  const fileNameAvatar = `${_id}_${originalname}`;

  console.log("fileNameAvatar", fileNameAvatar);

  try {
    const resultUpload = await makeUploadAvatars(fileNameAvatar);
    await fs.rename(tmpPathUpload, resultUpload);

    const avatarURL = await makeAvatarUrl(fileNameAvatar);
    const updated = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );

    return res.status(200).json({
      data: {
        user: {
          _id,
          email,
          avatarURL: updated.avatarURL,
        },
      },
    });
  } catch (error) {
    await fs.unlink(tmpPathUpload);
    throw error;
  }
};

module.exports = uploadAvatar;
