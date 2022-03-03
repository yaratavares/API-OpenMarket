import connection from "../db.js";

export default async function tokenValideMiddleware(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  const resultUser = await connection.query(
    `SELECT usuarios.*, sessoes.token 
      FROM usuarios JOIN sessoes
        ON sessoes."idUsuario" = usuarios.id
          WHERE sessoes.token = $1
    `,
    [token]
  );
  if (resultUser.rowCount === 0) {
    return res.sendStatus(401);
  }

  res.locals.user = resultUser.rows[0];

  next();
}
