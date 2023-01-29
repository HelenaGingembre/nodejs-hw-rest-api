const express = require("express");
const { tryCatchWrapper, download } = require("../../helpers/index");

const { userCtrl } = require("../../controllers");

const userRouter = express.Router();
const { authenticate } = require("../../helpers/authenticate");
const { formatImg } = require("../../helpers/formatImg");

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
  tryCatchWrapper(authenticate),
  download.single("avatar"),
  tryCatchWrapper(formatImg),
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
