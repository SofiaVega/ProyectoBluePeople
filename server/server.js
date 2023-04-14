const express = require("express");
const { Pool } = require("pg");

const attachId = require("./middleware/attachId");

const app = express();
app.use(express.json());

// Create a new database connection pool
const pool = new Pool({});

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
    const result = await client.query("SELECT * FROM users");
    const users = result.rows;
    client.release();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting users" });
  }
});

// register route - to do verify email
app.post("/api/register", async (req, res) => {
  try {
    const { name, email } = req.body;
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const users = existingUser.rows;
    if (users.length) {
      return res.status(400).json({ message: "User already exists" });
    }
    const id = await client.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id",
      [name, email]
    );
    res.status(201).json(id.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// login route - to do verify email
app.post("/api/login", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    const users = existingUser.rows;
    if (users.length) {
      res.status(201).json(users[0]);
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

//Get user topics
app.get("/api/topic", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    const user_status = await pool.query(
      "SELECT is_admin FROM users where id = $1",
      [user_id]
    );
    const user_admin = user_status.rows[0].is_admin;
    if (user_admin) {
      const title = req.title;
      const description = req.description;
    }
    res.status(200).json({ user_admin });
  } catch (err) {
    res.send(err);
  }
});

// Start the Express server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
