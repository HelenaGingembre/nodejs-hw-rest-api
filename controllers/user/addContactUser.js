const { User } = require("../../models/user");
// const { HttpError } = require("../../helpers/index");

const addContactUser = async (req, res, next) => {
  const { user } = req;
  const { id: contactId } = req.body;

  user.owner.push({ _id: contactId });
  await User.findByIdAndUpdate(user._id, user);

  return res.status(201).json({
    data: {
      owner: user.owner,
    },
  });
};

module.exports = addContactUser;
