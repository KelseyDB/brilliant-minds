import mariadb from 'mariadb'
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  conectionLimit: 5

});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

////route to landing page
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

//route to create idea
app.post('/create', async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  let connection
  try {
    connection = await pool.getConnection();  
    const prepare = await connection.prepare(`INSERT INTO ideas (title, description) VALUES (?, ?)`)
    prepare.execute([title, description]);
    connection.release();
    res.status(200).send();
  } catch(err) {
    throw err;
  } finally{
    if (connection) connection.end();
  }
  });

//route to delete button
app.delete("/delete", async (req, res) => {
  let connection
  const id = req.body.id;
  try {
    connection = await pool.getConnection();  
    const prepare = await connection.prepare(`DELETE FROM ideas WHERE id=?`)
    await prepare.execute([id]);
    res.send({query:true});
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
});

//route to update idea
app.put('/edit', async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  let connection
  try {
    connection = await pool.getConnection();  
    const prepare = await connection.prepare(`UPDATE ideas SET title = ?, description= ?, WHERE id = ?`)
    prepare.execute([title, description, id]);
  } catch(err) {
    throw err;
  } finally{
    if (connection) connection.end();
  }
  });

//server port connection
app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

