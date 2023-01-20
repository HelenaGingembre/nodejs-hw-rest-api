const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const { authCtrl } = require("../../controllers");
// const { contactsCtrl } = require("../../controllers");

// const { auth } = require("../middlewares");
const userRouter = express.Router();
const { authenticate } = require("../../helpers/authenticate");

// userRouter.post("/contacts", tryCatchWrapper(auth), tryCatchWrapper(contactsCtrl.addContact));
// userRouter.get("/contacts", tryCatchWrapper(auth), tryCatchWrapper(contactsCtrl.getAllContacts));
// userRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(authCtrl.getCurrentUser));

//current
userRouter.get(
  "/current",
  authenticate,
  tryCatchWrapper(authCtrl.getCurrentUser)
);

//logout
userRouter.get("/logout", authenticate, tryCatchWrapper(authCtrl.logout));

module.exports = {
  userRouter,
};
