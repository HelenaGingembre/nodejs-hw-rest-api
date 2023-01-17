const { HttpError } = require("../../helpers/index");
const { Contact } = require("../../models/contacts_schema");

const updateContact = async (req, res, next) => {
  const id = req.params.contactId;
  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateContact) {
    return next(HttpError(404, `Contact with id ${id} Not found`));
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact with id ${id} updated`,
    data: { updateContact },
  });
};

module.exports = updateContact;
