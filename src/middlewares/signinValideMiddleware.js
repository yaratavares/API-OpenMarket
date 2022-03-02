import signinSchema from "../schemas/signinSchema.js";

export default function signinValideMiddleware(req, res, next) {
  const validation = signinSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const err = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(err);
  }

  next();
}
