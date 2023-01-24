const express = require("express");

require("dotenv").config();
const { /*HttpError,*/ tryCatchWrapper } = require("../../helpers/index.js");
// const { User } = require("../../models/user");
const authRouter = express.Router();
const { authCtrl } = require("../../controllers");
const { validationCreateUser, validationLoginUser } = require("./validation");

//auth/signup
authRouter.post(
  "/signup",
  validationCreateUser,
  tryCatchWrapper(authCtrl.signup)
);

//auth/login
authRouter.post("/login", validationLoginUser, tryCatchWrapper(authCtrl.login));

module.exports = { authRouter };
