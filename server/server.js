import mariadb from 'mariadb'
import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  conectionLimit: 5

});

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query(`SELECT * FROM ideas`);
    res.send(data);
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
});

app.get("/show-ideas", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query(`SELECT * FROM ideas`);
    res.send(data);
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
});

// app.get('/create',)

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
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

