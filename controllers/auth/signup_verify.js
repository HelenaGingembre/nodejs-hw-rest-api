const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signupVerify = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("user register", req.body);
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new HttpError(409, `User with this ${email} already exists`);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);
    // console.log("avatarURL", avatarURL);

    const verificationToken = nanoid(email + process.env.SECRET_KEY);
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
      text: `Please, confirm your email address POST http://localhost:3000/api/auth/verify/${verificationToken}`,
      html: `Please, confirm your email address <a href="POST http://localhost:3000/api/auth/verify/${verificationToken}">confirm email</a>`,
    };
    await sgMail.send(msg);

    console.log("Email 'verify your Email' sent");

    res.status(201).json({
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
