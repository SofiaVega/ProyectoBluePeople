const express = require("express");
const { Pool } = require("pg");

const attachId = require("./middleware/attachId");

const app = express();
app.use(express.json());

// Create a new database connection pool
const pool = new Pool({
  user: "postgres",
  database: "notifydb",
});

// Test the database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Successfully connected to the database:", res.rows[0]);
  }
});

// test hello route
app.get("/hello", (req, res) => {
  res.send("hello");
});

//get all users route, should be Admin only
app.get("/api/users", attachId, async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM usuario");
    const users = result.rows;
    client.release();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error getting users" });
  }
});

// register route - to do verify email
app.post("/api/register", async (req, res) => {
  try {
    const { name, email } = req.body;
    const existingUser = await pool.query(
      "SELECT * FROM usuario WHERE email = $1",
      [email]
    );
    //Check if user email repeats
    const users = existingUser.rows;
    if (users.length) {
      return res.status(400).json({ message: "User already exists" });
    }
    //Admins need to be created directly, not from API
    const id = await pool.query(
      "INSERT INTO usuario (nombre, email, is_admin) VALUES ($1, $2, $3) RETURNING id",
      [name, email, false]
    );
    //Return user ID for further authentication
    res.status(201).json(id.rows);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// login route - to do verify email
app.post("/api/login", async (req, res) => {
  try {
    const { email } = req.body;
    //Return user ID using email
    const existingUser = await pool.query(
      "SELECT id FROM usuario WHERE email = $1",
      [email]
    );
    const users = existingUser.rows;
    if (users.length) {
      //On success return ID
      res.status(201).json(users[0]);
    } else {
      //User doesn't exist
      return res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

//Get user topics
app.get("/api/topic", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    const user_status = await pool.query(
      "SELECT is_admin FROM usuario where id = $1",
      [user_id]
    );
    const user_admin = user_status.rows[0].is_admin;
    if (user_admin) {
      const title = req.title;
      const description = req.description;
    }
    res.status(200).json({ user_admin });
  } catch (err) {
    console.log("uwu");
    console.log(err.message);
    res.send(err);
  }
});

// Start the Express server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
