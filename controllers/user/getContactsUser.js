const { User } = require("../../models/user");
// const { HttpError } = require("../../helpers/index");

const getContactsUser = async (req, res, next) => {
  const { user } = req;
  const userWithContacts = await User.findById(user._id).populate("contacts", {
    name: 1,
    phone: 1,
    email: 1,
    _id: 1,
  });

  return res.status(200).json({
    data: {
      owner: userWithContacts.owner,
    },
  });
};

module.exports = getContactsUser;
