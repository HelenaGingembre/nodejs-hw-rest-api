const jimp = require("jimp");

const SIZE = 250;

const formatImg = async (req, res, next) => {
  const { path: tmpUpload } = req.file;

  try {
    const img = await jimp.read(tmpUpload);

    await img.resize(SIZE, SIZE).writeAsync(tmpUpload); // save - writeAsync()
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = { formatImg };
