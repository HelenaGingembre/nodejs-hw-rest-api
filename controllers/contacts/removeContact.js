const { HttpError } = require("../../helpers/index");
const { Contact } = require("../../models/contacts_schema");

const removeContact = async (req, res, next) => {
  // const contact = await removeContact(req.params.contactId);

  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(HttpError(404, "Contact Not found"));
  }
  await Contact.findByIdAndRemove(id);

  console.log("delete contact by ID ", contact);
  return res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact deleted with id ${id}`,
  });
};

module.exports = removeContact;
