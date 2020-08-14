const Joi = require('@hapi/joi');

const registerUserValidation = (req) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(4)
      .required()
  })
  return schema.validate(req);
}

const loginUserValidation = (req) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(4)
      .required()
  })
  return schema.validate(req);
}

module.exports.registerUserValidation = registerUserValidation;
module.exports.loginUserValidation = loginUserValidation;