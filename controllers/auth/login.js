const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { SECRET_KEY } = process.env;
/**
 * 1. Find user by email
 * 2. If user not exists => throw an error 401
 * 3. If user exists => check password
 * 4. If password is the same => then return 200
 */

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
    verify: true,
  });
  console.log("storedUser", storedUser);
  if (!storedUser) {
    throw new HttpError(401, "email is not valid");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new HttpError(401, "password is not valid");
  }
  const payload = {
    id: storedUser._id,
  };
  // console.log("SECRET_KEY", SECRET_KEY);
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

  // console.log("token", token);
  return res.json({
    status: "success",
    code: 200,
    responseBody: {
      token,
      user: {
        email,
        subscription: storedUser.subscription,
      },
    },
  });
};

module.exports = login;
