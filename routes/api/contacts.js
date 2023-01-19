const express = require("express");

require("dotenv").config();
const { HttpError, tryCatchWrapper } = require("../../helpers/index.js");

const routerContacts = express.Router();

const {
  validationCreateContact,
  validationUpdateContact,
} = require("./validation");

const { contactsCtrl } = require("../../controllers");

routerContacts.get("/", tryCatchWrapper(contactsCtrl.getAllContacts));

routerContacts.get("/:contactId", tryCatchWrapper(contactsCtrl.getContactById));

routerContacts.post(
  "/",
  validationCreateContact,
  tryCatchWrapper(contactsCtrl.addContact)
);

routerContacts.delete(
  "/:contactId",
  tryCatchWrapper(contactsCtrl.removeContact)
);

routerContacts.put(
  "/:contactId",
  validationUpdateContact,
  tryCatchWrapper(contactsCtrl.updateContact)
);

routerContacts.patch(
  "/:contactId/favorite",
  validationUpdateContact,
  tryCatchWrapper(contactsCtrl.statusContact)
);

module.exports = routerContacts;
