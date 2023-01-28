const multer = require("multer");
// const path = require("path");
const { tmpDir } = require("./paths");

function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.resolve(__dirname, "../tmp"));
    cb(null, tmpDir);
  },
  filename: function (req, file, cb) {
    const { _id } = req.user;
    // cb(null, Math.random() + file.originalname);
    cb(null, _id + file.originalname);
  },
  // limits: {
  //   fileSize: 1048576,
  // },
});

const download = multer({
  storage: multerConfig,
});

module.exports = {
  tryCatchWrapper,
  HttpError,
  download,
};
