const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index");

const logout = async (req, res, next) => {
  const { id } = req.user;
  console.log("token avant logout", req.user.token);
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { token: "" },
    { new: true }
  );
  console.log("user logout", user);

  if (!user) {
    throw new HttpError(401, "Not authorized");
  }

  return res.status(204).json({
    state: "success",
    code: 204,
    message: "No Content",
    data: {
      user,
    },
  });
};

module.exports = logout;

//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2E3OTYxZTQ2ZjIxNDVhYzNiZDczNCIsImlhdCI6MTY3NDM5NjIyNX0.lzvcxZRO1twCO_ha-rxzUBgF7F1MsBAoJUb7OeUR8Oc"
