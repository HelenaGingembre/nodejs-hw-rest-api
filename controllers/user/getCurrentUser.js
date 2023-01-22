const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index");

const getCurrentUser = async (req, res, next) => {
  // const { email, _id: id, subscription } = req.user;

  const { user } = req;
  const { email, _id: id, subscription } = user;

  return res.status(200).json({
    data: {
      user: {
        email,
        id,
        subscription,
      },
    },
  });
};

module.exports = getCurrentUser;
