const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

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
} = require("../../controllers/contacts.controller");

routerContacts.get("/", getContactsController);

routerContacts.get("/:contactId", getContactController);

routerContacts.post("/", validationCreateContact, createContactController);

routerContacts.delete("/:contactId", deleteContactController);

routerContacts.put(
  "/:contactId",
  validationUpdateContact,
  updateContactController
);

module.exports = routerContacts;
