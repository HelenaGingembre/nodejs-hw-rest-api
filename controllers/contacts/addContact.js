const { Contact } = require("../../models/contacts_schema");

const addContact = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  console.log("newContact", newContact);

  return res.status(201).json({
    status: "success",
    code: 201,
    data: {
      newContact,
    },
  });
};

module.exports = addContact;
