import bcrypt from "bcrypt";
import connection from "../db.js";

export async function signup(req, res) {
  const newUser = req.body;

  try {
    const isDuplicate = await connection.query(
      `
    SELECT * FROM usuarios WHERE email = $1
    `,
      [newUser.email]
    );

    if (isDuplicate.rows.length) {
      return res.sendStatus(409);
    }

    const senhaHash = bcrypt.hashSync(newUser.senha, 10);

    await connection.query(
      `
      INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)
    `,
      [newUser.nome, newUser.email, senhaHash]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function signin(req, res) {
  const user = req.body;

  res.sendStatus(200);
}
