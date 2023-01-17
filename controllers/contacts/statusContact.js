const { HttpError } = require("../../helpers/index");
const { Contact } = require("../../models/contacts_schema");

const statusContact = async (req, res, next) => {
  const id = req.params.contactId;

  if (!req.body) {
    return next(HttpError(400, `Missing field favorite`));
  }
  const favorite = req.body.favorite;

  const updateFavoriteContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      new: true,
    }
  );
  console.log("contactUpdateFavorite", updateFavoriteContact);
  if (!updateFavoriteContact) {
    return next(HttpError(404, `Contact with id ${id} Not found`));
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact with id ${id} updated`,
    data: { updateFavoriteContact },
  });
};

module.exports = statusContact;
