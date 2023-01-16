const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .min(10)
    .max(14)
    .required(),
  favorite: Joi.bool(false),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().optional(),
  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .min(10)
    .max(14)
    .optional(),
}).or("name", "email", "phone");

const validate = async (schema, obj, next, message) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    next({
      status: 400,
      message: message,
    });
  }
};

module.exports = {
  validationCreateContact: (req, res, next) => {
    return validate(
      schemaCreateContact,
      req.body,
      next,
      "missing required name field"
    );
  },
  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next, "missing field");
  },
};
