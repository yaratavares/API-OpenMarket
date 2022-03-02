import joi from "joi";

const signinSchema = joi.object({
  email: joi.string().email().required(),
  senha: joi.string().required(),
});

export default signinSchema;
