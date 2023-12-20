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
  conectionLimit: 5

});

const app = express();

app.use(cors())
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

//route to new idea create page
app.get("/create-idea", async (req, res) => {
  try {
    res.send("create page")
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
})

//route to delete button
app.get("/delete", async (req, res) => {
  try {
    res.send("delete")
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

//route to specific ideas ID
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

app.post('/create', async (req, res) => {
  // let connection;
  // connection = await pool.getConnection();
  const title = 'new idea'
  const description = 'lorem'
  pool.query(`INSERT INTO ideas (title, description) VALUES (?, ?)`, [title, description], (err, result)=>{
    if(err){
      res.send('error');
    }else{
      res.send(result)
    }
  })
})
;

//server port connection
app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

