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
  favorite: Joi.bool().valid(true, false),
}).or("name", "email", "phone", "favorite");

const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const schemaCreateUser = Joi.object({
  // name: Joi.string().required(),
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().min(6).required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().required(),
});

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
  validationCreateUser: (req, res, next) => {
    return validate(
      schemaCreateUser,
      req.body,
      next,
      "missing required argument UserSignup"
    );
  },
  validationLoginUser: (req, res, next) => {
    return validate(
      schemaLoginUser,
      req.body,
      next,
      "missing required argument UserLogin"
    );
  },
};
