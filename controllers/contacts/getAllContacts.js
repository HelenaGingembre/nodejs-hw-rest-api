const { Contact } = require("../../models/contacts_schema");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  return res.status(200).json({
    code: 200,
    message: "success",
    data: { contacts },
    quantity: contacts.length,
  });
};

module.exports = getAllContacts;
