const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, BASE_URL, PORT } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
// console.log("SENDGRID_API_KEY:", SENDGRID_API_KEY);

const signupVerify = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("user register", req.body);
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new HttpError(409, `User with this ${email} already exists`);
    }
    console.log("user register", req.body);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);
    console.log("avatarURL", avatarURL);

    const verificationToken = nanoid();
    console.log("verificationToken", verificationToken);

    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
      verify: false,
    });

    const msg = {
      to: email,
      from: "e.izotovagingembre@outlook.com",
      subject: "Please confirm your email  address!",
      text: `Please, confirm your email address POST ${BASE_URL}${PORT}/api/auth/verify/${verificationToken}`,
      html: `Please, confirm your email address <a target="_blank" href="${BASE_URL}${PORT}/api/auth/verify/${verificationToken}">confirm email</a>`,
    };
    await sgMail.send(msg);

    // console.log("Verification email sent");

    res.status(200).json({
      status: 200,
      message: "Verification email sent",
      data: {
        user: {
          email: savedUser.email,
          id: savedUser._id,
          subscription: savedUser.subscription,
          avatarURL: savedUser.avatarURL,
          verificationToken: savedUser.verificationToken,
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

module.exports = signupVerify;
