const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index");

const logout = async (req, res, next) => {
  const { id } = req.user;
  console.log("token avant logout", req.user.token);
  const user = await User.findByIdAndUpdate(id, { token: "" });
  console.log("user logout", user);
  // const user = await User.updateToken(id, null);
  if (!user) {
    throw new HttpError(401, "Not authorized");
  }
  return res.status(204).json({
    state: "success",
    code: 204,
    message: "No Content",
  });
};

module.exports = logout;

//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2E3OTYxZTQ2ZjIxNDVhYzNiZDczNCIsImlhdCI6MTY3NDM5NjIyNX0.lzvcxZRO1twCO_ha-rxzUBgF7F1MsBAoJUb7OeUR8Oc"
