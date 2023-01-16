const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool(),
}).or("name", "email", "phone", "favorite");

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
