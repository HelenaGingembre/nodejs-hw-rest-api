const { User } = require("../../models/user");
//const { HttpError } = require("../../helpers/index");

const getCurrentUser = async (req, res, next) => {
  const { email, _id: id, subscription } = req.user;

  const { token } = req;

  const userCurrent = await User.findOne(
    { token },
    { email: 1, subscription: 1, _id: 0 }
  );

  // console.log("current user", userCurrent);
  return res.status(200).json({
    data: {
      userCurrent: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrentUser;
