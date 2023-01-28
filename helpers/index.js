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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.resolve(__dirname, "../tmp"));
    cb(null, tmpDir);
  },
  filename: function (req, file, cb) {
    // cb(null, Math.random() + file.originalname);
    cb(null, Math.random() + file.originalname);
  },
  // limits: {
  //   fileSize: 1048576,
  // },
});

const upload = multer({
  storage,
});

module.exports = {
  tryCatchWrapper,
  HttpError,
  upload,
};
