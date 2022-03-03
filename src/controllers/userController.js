import bcrypt from "bcrypt";
import connection from "../db.js";
import { v4 as uuid } from "uuid";

export async function signup(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const isDuplicate = await connection.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (isDuplicate.rowCount !== 0) {
      return res.sendStatus(409);
    }

    const senhaHash = bcrypt.hashSync(senha, 10);

    await connection.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
      [nome, email, senhaHash]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function signin(req, res) {
  const { email, senha } = req.body;

  try {
    const result = await connection.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const user = result.rows[0];

    if (bcrypt.compareSync(senha, user.senha)) {
      const token = uuid();

      const userIsConnect = await connection.query(
        `SELECT * FROM sessoes WHERE "idUsuario" = $1`,
        [user.id]
      );

      if (userIsConnect.rows.length) {
        await connection.query(
          `UPDATE sessoes SET token = $1 WHERE "idUsuario" = $2`,
          [token, user.id]
        );
        return res.sendStatus(200);
      }

      await connection.query(
        `INSERT INTO sessoes ("idUsuario", token) VALUES ( $1, $2)`,
        [user.id, token]
      );
      res.sendStatus(201);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
