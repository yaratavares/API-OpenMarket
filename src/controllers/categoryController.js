import connection from "../db.js";

export async function getCategories(req, res) {
  try {
    const resultCategories = await connection.query("SELECT * FROM categorias");
    const categories = resultCategories.rows;

    res.status(200).send(categories);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCategory(req, res) {
  const { id } = req.params;

  try {
    const resultCategory = await connection.query(
      "SELECT * FROM categorias WHERE id = $1",
      [id]
    );
    const category = resultCategory.rows[0];

    res.status(200).send(category);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function addCategory(req, res) {
  const { user } = res.locals;
  const { nome } = req.body;

  try {
    await connection.query("INSERT INTO categorias (nome) VALUES ($1)", [nome]);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function updateCategory(req, res) {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const productId = await connection.query(
      "SELECT * FROM categorias WHERE id=$1",
      [id]
    );
    if (productId.rowCount === 0) {
      return res.sendStatus(404);
    }

    await connection.query(`UPDATE categorias SET nome=$1 WHERE id=$1 `, [
      nome,
      id,
    ]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteCategory(req, res) {
  const { id } = req.params;

  try {
    const productId = await connection.query(
      "SELECT * FROM categorias WHERE id=$1",
      [id]
    );
    if (productId.rowCount === 0) {
      return res.sendStatus(404);
    }

    await connection.query(`DELETE FROM categorias WHERE id=$1`, [id]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
