const express = require("express");

require("dotenv").config();
const { HttpError, tryCatchWrapper } = require("../../helpers/index.js");
const { User } = require("../../models/user");
const routerUser = express.Router();
const { authCtrl } = require("../../controllers");
const { validationCreateUser, validationLoginUser } = require("./validation");

//users/signup
routerUser.post(
  "/signup",
  validationCreateUser,
  tryCatchWrapper(authCtrl.signup)
);

//login
routerUser.post("/login", validationLoginUser, tryCatchWrapper(authCtrl.login));

//current
routerUser.get(
  "/current",
  authenticate,
  tryCatchWrapper(authCtrl.getCurrentUser)
);

//logout
routerUser.get("/logout", authenticate, tryCatchWrapper(authCtrl.logout));

module.exports = routerUser;
