const { join } = require("path");

const tmpDir = join(__dirname, "../", "tmp");
const publicDir = join(__dirname, "../", "public");
const avatarsDir = join(publicDir, "avatars");

const makeUploadAvatars = async (fileNameAvatar) =>
  join(avatarsDir, fileNameAvatar);

const makeAvatarUrl = async (fileNameAvatar) =>
  join("public", "avatars", fileNameAvatar);

module.exports = {
  tmpDir,
  publicDir,
  avatarsDir,
  makeUploadAvatars,
  makeAvatarUrl,
};
