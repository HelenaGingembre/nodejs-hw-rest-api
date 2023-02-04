const express = require("express");

require("dotenv").config();
const { tryCatchWrapper } = require("../../helpers/index.js");

const authRouter = express.Router();
const { authCtrl } = require("../../controllers");
const { validationCreateUser, validationLoginUser } = require("./validation");

//auth/signup
authRouter.post(
  "/signup",
  validationCreateUser,
  tryCatchWrapper(authCtrl.signupVerify)
);
//GET /auth/verify/:verificationToken

authRouter.get(
  "/verify/:verificationToken",
  validationCreateUser,
  tryCatchWrapper(authCtrl.signupConfirmation)
);

//auth/login
authRouter.post("/login", validationLoginUser, tryCatchWrapper(authCtrl.login));

module.exports = { authRouter };
