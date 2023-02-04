const { User } = require("../../models/user");

const addContactUser = async (req, res, next) => {
  const { user } = req;
  const { id: contactId } = req.body;

  user.owner.push({ _id: contactId });
  await User.findByIdAndUpdate(user._id, user);

  return res.status(201).json({
    data: {
      contacts: user.contacts,
    },
  });
};

module.exports = addContactUser;
