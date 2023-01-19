const express = require("express");

require("dotenv").config();
const { HttpError, tryCatchWrapper } = require("../../helpers/index.js");
const { User } = require("../../models/users");
const routerUsers = express.Router();
const { authCtrl } = require("../../controllers");
const { validationCreateUser, validationLoginUser } = require("./validation");

//users/signup
routerUsers.post(
  "/signup",
  validationCreateUser,
  tryCatchWrapper(authCtrl.signup)
);

//login
routerUsers.post(
  "/login",
  validationLoginUser,
  tryCatchWrapper(authCtrl.login)
);

//current
routerUsers.get(
  "/current",
  authenticate,
  tryCatchWrapper(authCtrl.getCurrentUser)
);

//logout
routerUsers.get("/logout", authenticate, tryCatchWrapper(authCtrl.logout));

module.exports = routerUsers;
