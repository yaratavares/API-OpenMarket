import connection from "../db.js";

export async function getProducts(req, res) {
  try {
    const resultProducts = await connection.query("SELECT * FROM produtos");
    const products = resultProducts.rows[0];

    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getProduct(req, res) {
  res.sendStatus(200);
}

export async function addProduct(req, res) {
  const { user } = res.locals;
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);
  }

  try {
    const resultProductId = await connection.query(
      "SELECT * FROM produtos WHERE id = $1",
      [id]
    );
    if (resultProductId.rowCount === 0) {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  res.sendStatus(200);
}

export async function updateProduct(req, res) {
  res.sendStatus(200);
}

export async function deleteProduct(req, res) {
  res.sendStatus(200);
}
