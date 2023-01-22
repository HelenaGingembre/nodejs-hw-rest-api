const jwt = require("jsonwebtoken");
const { HttpError } = require("./index");
const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers || "";
  console.log("authorization", req.headers);
  const [type, token] = authorization.split(" ");
  console.log("token", token);
  if (type !== "Bearer") {
    throw HttpError(
      401,
      "Failed to authenticate token, token type is not valid"
    );
  }
  if (!token) {
    throw HttpError(401, "no token provided");
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    console.log("user by  id", user);
    if (!user || !user.token || user.token !== token) {
      throw new HttpError(401, "Don't find user by id");
    }
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw HttpError(401, "jwt token is not valid");
    }
    throw error;
  }
  next();
};

module.exports = { authenticate };
