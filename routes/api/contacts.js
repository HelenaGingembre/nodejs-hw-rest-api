const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
require("dotenv").config();
const { HttpError, tryCatchWrapper } = require("../../helpers/index.js");

const routerContacts = express.Router();

const {
  validationCreateContact,
  validationUpdateContact,
} = require("./validation");

const {
  getContactsController,
  getContactController,
  deleteContactController,
  createContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contacts.controller");

routerContacts.get("/", tryCatchWrapper(getContactsController));

routerContacts.get("/:contactId", tryCatchWrapper(getContactController));

routerContacts.post(
  "/",
  // validationCreateContact,
  tryCatchWrapper(createContactController)
);

routerContacts.delete("/:contactId", tryCatchWrapper(deleteContactController));

routerContacts.put(
  "/:contactId",
  validationUpdateContact,
  tryCatchWrapper(updateContactController)
);

routerContacts.patch(
  "/:contactId/favorite",
  validationUpdateContact,
  tryCatchWrapper(updateStatusContactController)
);
module.exports = routerContacts;
