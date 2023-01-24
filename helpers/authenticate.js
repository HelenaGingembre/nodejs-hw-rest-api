const jwt = require("jsonwebtoken");
const { HttpError } = require("./index");
const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  console.log("authorization", req.headers);
  const [type, token] = authHeader.split(" ");
  console.log("token", token);
  if (type !== "Bearer") {
    throw new HttpError(
      401,
      "Failed to authenticate token, token type is not valid. Not authorized"
    );
  }
  if (!token) {
    throw new HttpError(401, "no token provided. Not authorized");
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    console.log("user by  id", user);

    if (!user) {
      throw new HttpError(401, "Don't find user by id. Not authorized");
    }
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw new HttpError(401, "jwt token is not valid");
    }
    throw error;
  }
  next();
};

module.exports = { authenticate };
