import signupSchema from "../schemas/signupSchema.js";

export default function signupValideMiddleware(req, res, next) {
  const validation = signupSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const err = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(err);
  }

  next();
}
