const { Contact } = require("../../models/contacts_schema");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  return res.json(contacts);
};

module.exports = getAllContacts;
