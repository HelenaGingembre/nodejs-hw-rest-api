const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("user register", req.body);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      data: {
        user: {
          email: savedUser.email,
          id: savedUser._id,
          subscription: savedUser.subscription,
        },
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw new HttpError(409, "User with this email already exists");
    }

    throw error;
  }
};

module.exports = signup;
