const jimp = require("jimp");
const path = require("path");

const SIZE = 250;

const formatImg = async (req, res, next) => {
  console.log("req.file in format", req.file);
  const { path: tempUpload } = req.file;

  try {
    const img = await jimp.read(tempUpload);

    await img.resize(SIZE, SIZE).writeAsync(tempUpload); // save - writeAsync()
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = { formatImg };
