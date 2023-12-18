import mariadb from 'mariadb'
import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const PORT = process.env.PORT || 3000;

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  conectionLimit: 5

});

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query(`SELECT * FROM ideas`);
    console.log(data);
    res.send(data);
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
});

app.get('/ideas/:id', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const prepare = await connection.prepare(
      "SELECT * FROM ideas WHERE id = ?"
    );
    const data = await prepare.execute([req.params.id]);
    res.send(data);
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
});

app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
});

// (async () => {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     const data = await connection.query(`SELECT * FROM ideas`);
//     console.log(data);
//   } catch (err) {
//     throw err;
//   } finally {
//     if (connection) connection.end();
//   }
// })();

