// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../models/contacts");
const { HttpError } = require("../helpers/index.js");
const { Contact } = require("../schemas/contacts");

const getContactsController = async (req, res, next) => {
  const contacts = await Contact.find({});
  return res.json(contacts);
};

const getContactController = async (req, res, next) => {
  const id = req.params.contactId;

  const contact = await Contact.findById(id);

  if (!contact) {
    return next(HttpError(404, `Not found contact with id- ${id}`));
  }
  return res.json(contact);
};

const createContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;
  console.log("favorite create", req.body.favorite);
  // const contact = await addContact({ name, email, phone });
  const newContact = await Contact.create({ name, email, phone });
  s;
  res.status(201).json(newContact);
};

const deleteContactController = async (req, res, next) => {
  // const contact = await removeContact(req.params.contactId);

  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(HttpError(404, "Contact Not found"));
  }
  await Contact.findByIdAndRemove(id);
  return res.status(200).json(contact, {
    status: "success",
    code: 200,
    message: `Contact deleted with id ${id}`,
  });
};

const updateContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const updateContact = await Contact.findByIdAndUpdate(id, req.body);

  if (!updateContact) {
    return next(HttpError(404, `Contact with id ${id} Not found`));
  }

  return res.status(200).json(updateContact, {
    status: "success",
    code: 200,
    message: `Contact with id ${id} updated`,
  });
};

const updateStatusContactController = async (req, res, next) => {
  const id = req.params.contactId;

  if (!req.body) {
    return next(HttpError(400, `Missing field favorite`));
  }
  const favorite = req.body.favorite;

  const updateFavoriteContact = await Contact.findByIdAndUpdate(id, {
    favorite,
  });
  console.log("contactUpdateFavorite", updateFavoriteContact);
  if (!updateFavoriteContact) {
    return next(HttpError(404, `Contact with id ${id} Not found`));
  }

  return res.status(200).json(updateFavoriteContact, {
    status: "success",
    code: 200,
    message: `Contact with id ${id} updated`,
  });
};
module.exports = {
  getContactsController,
  getContactController,
  createContactController,
  deleteContactController,
  updateContactController,
  updateStatusContactController,
};
