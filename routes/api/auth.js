const express = require("express");

require("dotenv").config();
const { /*HttpError,*/ tryCatchWrapper } = require("../../helpers/index.js");
// const { User } = require("../../models/user");
const authRouter = express.Router();
const { authCtrl } = require("../../controllers");
const { validationCreateUser, validationLoginUser } = require("./validation");
const signupVerify = require("../../controllers/auth/signup_verify.js");

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
