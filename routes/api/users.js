const express = require("express");

require("dotenv").config();
const { /*HttpError,*/ tryCatchWrapper } = require("../../helpers/index.js");
// const { User } = require("../../models/user");
const authRouter = express.Router();
const { authCtrl } = require("../../controllers");
const { validationCreateUser, validationLoginUser } = require("./validation");
const { authenticate } = require("../../helpers/authenticate");

//users/signup
authRouter.post(
  "/signup",
  validationCreateUser,
  tryCatchWrapper(authCtrl.signup)
);

//login
authRouter.post("/login", validationLoginUser, tryCatchWrapper(authCtrl.login));

//current
authRouter.get(
  "/current",
  authenticate,
  tryCatchWrapper(authCtrl.getCurrentUser)
);

//logout
authRouter.get("/logout", authenticate, tryCatchWrapper(authCtrl.logout));

module.exports = { authRouter };
