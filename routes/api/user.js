const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const { authCtrl } = require("../../controllers");
const { userCtrl } = require("../../controllers");

const userRouter = express.Router();
const { authenticate } = require("../../helpers/authenticate");

userRouter.post(
  "/contacts",
  tryCatchWrapper(authenticate),
  tryCatchWrapper(userCtrl.addContactUser)
);
userRouter.get(
  "/contacts",
  tryCatchWrapper(authenticate),
  tryCatchWrapper(userCtrl.getContactsUser)
);

//current
userRouter.get(
  "/current",
  tryCatchWrapper(authenticate),
  tryCatchWrapper(userCtrl.getCurrentUser)
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
