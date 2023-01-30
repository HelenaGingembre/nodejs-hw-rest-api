const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, BASE_URL, PORT } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new HttpError(
        400,
        "missing required field email. User with such email is not registered."
      );
    }
    if (user.verify === false) {
      const msg = {
        to: user.email,
        from: "e.izotovagingembre@outlook.com",
        subject: "Please confirm your email  address!",
        text: `Please, confirm your email address POST ${BASE_URL}${PORT}/api/auth/verify/${user.verificationToken}`,
        html: `Please, confirm your email address <a target="_blank" href="${BASE_URL}${PORT}/api/auth/verify/${user.verificationToken}">confirm email</a>`,
      };
      await sgMail.send(msg);

      console.log("Verification email sent");

      return res.status(200).json({
        status: 200,
        message: "Verification email sent",
        data: {
          user: user,
        },
      });
    } else {
      throw new HttpError(400, "Verification has already been passed");
    }
  } catch (error) {
    throw new HttpError(error.status, error.message);
  }
};

module.exports = resendVerifyEmail;
