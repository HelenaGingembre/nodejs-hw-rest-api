const express = require("express");

require("dotenv").config();
const { tryCatchWrapper } = require("../../helpers/index.js");

const contactsRouter = express.Router();

const {
  validationCreateContact,
  validationUpdateContact,
} = require("./validation");

const { contactsCtrl } = require("../../controllers");

contactsRouter.get("/", tryCatchWrapper(contactsCtrl.getAllContacts));

contactsRouter.get("/:contactId", tryCatchWrapper(contactsCtrl.getContactById));

contactsRouter.post(
  "/",
  validationCreateContact,
  tryCatchWrapper(contactsCtrl.addContact)
);

contactsRouter.delete(
  "/:contactId",
  tryCatchWrapper(contactsCtrl.removeContact)
);

contactsRouter.put(
  "/:contactId",
  validationUpdateContact,
  tryCatchWrapper(contactsCtrl.updateContact)
);

contactsRouter.patch(
  "/:contactId/favorite",
  validationUpdateContact,
  tryCatchWrapper(contactsCtrl.statusContact)
);

module.exports = { contactsRouter };
