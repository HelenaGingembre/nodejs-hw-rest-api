const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContactsController = async (req, res, next) => {
  const contacts = await listContacts();

  return res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getContactController = async (req, res, next) => {
  const id = req.params.contactId;
  // const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    return res.json({
      status: "error",
      code: 404,
      message: `Not found contact with id- ${id}`,
    });
  }
  return res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

const createContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;

  const contact = await addContact({ name, email, phone });

  return res.status(201).json({
    status: "success",
    code: 201,
    message: `Contact has been added`,
    data: {
      contact,
    },
  });
};

const deleteContactController = async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);

  if (!contact) {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact deleted with id ${req.params.contactId}`,
  });
};

const updateContactController = async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);

  if (!contact) {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

module.exports = {
  getContactsController,
  getContactController,
  createContactController,
  deleteContactController,
  updateContactController,
};
