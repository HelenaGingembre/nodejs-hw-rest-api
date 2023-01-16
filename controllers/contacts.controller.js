// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../models/contacts");
const { HttpError } = require("../helpers/index.js");
const { Contact } = require("../models/contacts_schema");

const getContactsController = async (req, res, next) => {
  const contacts = await Contact.find({});
  return res.json(contacts);
};

const getContactController = async (req, res, next) => {
  const id = req.params.contactId;

  const contact = await Contact.findById(id);
  console.log("contactById", contact);
  if (!contact) {
    return next(HttpError(404, `Not found contact with id- ${id}`));
  }
  return res.json(contact);
};

const createContactController = async (req, res, next) => {
  // const { name, email, phone } = req.body;
  // console.log("favorite create", req.body.favorite);
  // const contact = await addContact({ name, email, phone });
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

const deleteContactController = async (req, res, next) => {
  // const contact = await removeContact(req.params.contactId);

  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(HttpError(404, "Contact Not found"));
  }
  await Contact.findByIdAndRemove(id);

  console.log("delete contact by ID ", contact);
  return res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact deleted with id ${id}`,
  });
};

const updateContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateContact) {
    return next(HttpError(404, `Contact with id ${id} Not found`));
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact with id ${id} updated`,
    data: { updateContact },
  });
};

const updateStatusContactController = async (req, res, next) => {
  const id = req.params.contactId;

  if (!req.body) {
    return next(HttpError(400, `Missing field favorite`));
  }
  const favorite = req.body.favorite;

  const updateFavoriteContact = await Contact.findByIdAndUpdate(id, favorite, {
    new: true,
  });
  console.log("contactUpdateFavorite", updateFavoriteContact);
  if (!updateFavoriteContact) {
    return next(HttpError(404, `Contact with id ${id} Not found`));
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact with id ${id} updated`,
    data: { updateFavoriteContact },
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
