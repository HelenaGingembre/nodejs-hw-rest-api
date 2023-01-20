const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const { authCtrl } = require("../../controllers");
const { contactsCtrl } = require("../../controllers");

const userRouter = express.Router();
const { authenticate } = require("../../helpers/authenticate");

userRouter.post(
  "/contacts",
  tryCatchWrapper(authenticate),
  tryCatchWrapper(contactsCtrl.addContact)
);
userRouter.get(
  "/contacts",
  tryCatchWrapper(authenticate),
  tryCatchWrapper(contactsCtrl.getAllContacts)
);
userRouter.get(
  "/current",
  tryCatchWrapper(authenticate),
  tryCatchWrapper(authCtrl.getCurrentUser)
);

//current
userRouter.get(
  "/current",
  tryCatchWrapper(authenticate),
  tryCatchWrapper(authCtrl.getCurrentUser)
);

//logout
userRouter.get(
  "/logout",
  tryCatchWrapper(authenticate),
  tryCatchWrapper(authCtrl.logout)
);

module.exports = {
  userRouter,
};
