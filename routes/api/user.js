const express = require("express");
const { tryCatchWrapper, uploadAvatar } = require("../../helpers/index");

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
//avatar
userRouter.patch(
  "/avatars",
  uploadAvatar.single("avatarsURL"),
  tryCatchWrapper(userCtrl.uploadAvatar)
);
//logout
userRouter.get(
  "/logout",
  tryCatchWrapper(authenticate),
  tryCatchWrapper(userCtrl.logout)
);

module.exports = {
  userRouter,
};
