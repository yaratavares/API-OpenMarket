import connection from "../db.js";

export default async function tokenValideMiddleware(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  const session = await connection.query(`
    SELECT * FROM sessoes 
        WHERE token = ${token}
  `);
  if (!session) {
    return res.sendStatus(401);
  }

  res.locals.user = user;
  res.locals.session = session;

  next();
}
