const jimp = require("jimp");
// const path = require("path");

const SIZE = 250;

const formatImg = async (req, res, next) => {
  console.log("req.file in format", req.file);
  const { path: tmpUpload } = req.file;

  const img = await jimp.read(tmpUpload);

  await img.resize(SIZE, SIZE).quality(60).writeAsync(tmpUpload); // save - writeAsync()
  next();
};

module.exports = { formatImg };
