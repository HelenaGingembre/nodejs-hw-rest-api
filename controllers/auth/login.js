const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");

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
  });

  if (!storedUser) {
    throw new HttpError(401, "email is not valid");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new HttpError(401, "password is not valid");
  }

  return res.json({
    data: {
      token: "<TOKEN>",
    },
  });
};

module.exports = login;
