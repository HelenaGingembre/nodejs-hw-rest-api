const { User } = require("../../models/users");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");

const { SECRET_KEY } = process.env;
/**
 * 1. Find user by email
 * 2. If user not exists => throw an error 401
 * 3. If user exists => check password
 * 4. If password is the same => then return 200
 */

const login = async (req, res, next) => {
  const { email, password, subscription } = req.body;

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
  const payload = {
    id: User._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  ///  TODO !!!!! token!!!!!
  await User.findByIdAndUpdate(User._id, { token });

  return res.json({
    // data: {
    //   token: "<TOKEN>",
    // },
    status: "success",
    code: 200,
    responseBody: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = login;
