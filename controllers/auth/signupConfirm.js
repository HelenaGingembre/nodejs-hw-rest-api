const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signupConfirmation = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const userVerify = await User.findOne({ verificationToken, verify: false });
    if (!userVerify) {
      throw new HttpError(
        404,
        `Invalid or expired confirmation code. Not Found`
      );
    }

    const userId = userVerify._id;

    const savedUserVerify = await User.findByIdAndUpdate({
      userId,
      verificationToken: null,
      verify: true,
    });
    if (!savedUserVerify) {
      throw new HttpError(
        404,
        `Invalid or expired confirmation code. Not Found`
      );
    }

    const msg = {
      to: savedUserVerify.email,
      from: "e.izotovagingembre@outlook.com",
      subject: "Thank you for registration!",
      text: `Thank you for registration! Your email address has been verified.`,
      html: `<h1> Thank you for registration! Your email address has been verified.<h1>`,
    };
    await sgMail.send(msg);

    console.log("Email sent ");

    res.status(201).json({
      data: {
        user: {
          email: savedUserVerify.email,
          id: savedUserVerify._id,
          subscription: savedUserVerify.subscription,
          avatarURL: savedUserVerify.avatarURL,
          verificationToken: null,
          verify: true,
        },
      },
    });
  } catch (error) {
    throw new HttpError(error.status, error.message);
  }
};

module.exports = signupConfirmation;

/*const forgotPassword = async (email) => {
  const user = await User.findOne({email, confirmed: true});

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }

  const password = sha256(Date.now() + process.env.JWT_SECRET);
  user.password = password;
  await user.save();

  const msg = {
    to: user.email,
    from: 'ezhov.kirill98@gmail.com',
    subject: 'Forgot password!',
    text: `Here is your temporary password: ${password}`,
    html: `Here is your temporary password: ${password}`,
  };
  await sgMail.send(msg);
};
*/
