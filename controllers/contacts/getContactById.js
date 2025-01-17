const { HttpError } = require("../../helpers/index");
const { Contact } = require("../../models/contacts_schema");

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;

  const contact = await Contact.findById(id);
  console.log("contactById", contact);
  if (!contact) {
    return next(HttpError(404, `Not found contact with id- ${id}`));
  }
  return res
    .status(200)
    .json({ code: 200, message: "success", data: { contact } });
};

module.exports = getContactById;
