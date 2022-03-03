import connection from "../db.js";

export async function getProducts(req, res) {
  try {
    const resultProducts = await connection.query("SELECT * FROM produtos");
    const products = resultProducts.rows;

    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getProduct(req, res) {
  const { id } = req.params;

  try {
    const resultProduct = await connection.query(
      "SELECT * FROM produtos WHERE id = $1",
      [id]
    );
    const product = resultProduct.rows[0];

    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function addProduct(req, res) {
  const { user } = res.locals;
  const newProduct = req.body;

  try {
    await connection.query(
      `INSERT INTO produtos (nome, preco, "idUsuario") VALUES ($1, $2, $3)`,
      [newProduct.nome, newProduct.preco, user.id]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { user } = res.locals;
  const { nome, preco } = req.body;

  try {
    const productId = await connection.query(
      "SELECT * FROM produtos WHERE id=$1",
      [id]
    );
    if (productId.rowCount === 0) {
      return res.sendStatus(404);
    }
    const productUser = await connection.query(
      `SELECT * FROM produtos WHERE id=$1 AND "idUsuario"=$2`,
      [id, user.id]
    );
    if (productUser.rowCount === 0) {
      return res.sendStatus(401);
    }

    await connection.query(
      `UPDATE produtos SET nome=$1, preco=$2 WHERE id=$3 AND "idUsuario" = $4 `,
      [nome, preco, id, user.id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const productId = await connection.query(
      "SELECT * FROM produtos WHERE id=$1",
      [id]
    );
    if (productId.rowCount === 0) {
      return res.sendStatus(404);
    }
    const productUser = await connection.query(
      `SELECT * FROM produtos WHERE id=$1 AND "idUsuario"=$2`,
      [id, user.id]
    );
    if (productUser.rowCount === 0) {
      return res.sendStatus(401);
    }

    await connection.query(
      `DELETE FROM produtos WHERE id=$1 AND "idUsuario" = $2 `,
      [id, user.id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
