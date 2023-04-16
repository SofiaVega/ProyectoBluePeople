const express = require("express");
const cors = require("cors");
const attachId = require("./middleware/attachId");
const pool = require("./db.js");

const app = express();

app.use(express.json());
const corsOptions ={
  origin:'*', 
  credentials:true, //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));

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

//get all users route, admin only
app.get("/api/users", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    //Check if user is admin
    const user_status = await pool.query(
      "SELECT is_admin FROM usuario where id = $1",
      [user_id]
    );
    const user_admin = user_status.rows[0].is_admin;
    //If flag is false, user is not admin
    if (!user_admin) {
      res.status(401).send("Unauthorized");
    }
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

//Create new topic route, admin only
app.post("/api/topic", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    //Check if user is admin
    const user_status = await pool.query(
      "SELECT is_admin FROM usuario where id = $1",
      [user_id]
    );
    const user_admin = user_status.rows[0].is_admin;
    //If flag is false, user is not admin
    if (!user_admin) {
      res.status(401).send("Unauthorized");
    }
    //Get the rest of the data from the form
    const { title, description, accesoMensajesPrev, cod } = req.body;
    const tema_id = await pool.query(
      "INSERT INTO temas (titulo, admin_id, descripcion, accessoMensajesPrev, cod) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [title, user_id, description, accesoMensajesPrev, cod]
    );
    res.status(201).json(tema_id.rows);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

//Get all topics - admin only
app.get("/api/topic", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    //Check if user is admin
    const user_status = await pool.query(
      "SELECT is_admin FROM usuario where id = $1",
      [user_id]
    );
    const user_admin = user_status.rows[0].is_admin;
    //If flag is false, user is not admin
    if (!user_admin) {
      res.status(401).send("Unauthorized");
    }
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM temas");
    const topics = result.rows;
    client.release();
    res.json(topics);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error getting topics" });
  }
});

//Route for subscribing to a topic
app.post("/api/subscribe/:id", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    const topic_id = req.params.id;
    //Check if topic exists
    const result = await pool.query("SELECT * FROM temas WHERE id = $1", [
      topic_id,
    ]);
    if (result.rows.length === 0) {
      // If ID does not exist in the database, send an error response
      return res.status(401).json({ error: "Topic not found" });
    }
    //If topic exists, create new entry in tema_sus
    await pool.query(
      "INSERT INTO tema_sus (temas_id, suscriptor_id) VALUES ($1, $2)",
      [topic_id, user_id]
    );
    res.status(201).send("Success!");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error subscribing" });
  }
});

//Route for checking topics for a user
app.get("/api/subscriptions", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    //Get user topics, query for title and description
    const result = await pool.query(
      "SELECT temas.titulo, temas.descripcion, temas.id FROM temas JOIN tema_sus ON tema_sus.temas_id = temas.id WHERE suscriptor_id = $1",
      [user_id]
    );
    if (result.rows.length === 0) {
      // If no topics found
      return res
        .status(401)
        .json({ error: "User is not subscribed to any topics" });
    }
    res.status(201).send(result.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error subscribing" });
  }
});

//Route for getting messages from a topic
app.get("/api/topic/:id/messages", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    const topic_id = req.params.id;
    //Check user messages
    const client = await pool.connect();
    const message_list = await client.query(
      "SELECT mensaje, mensajes.id, titulo, descripcion FROM tema_sus JOIN mensajes ON tema_sus.temas_id = mensajes.tema_id JOIN temas ON tema_sus.temas_id = temas.id WHERE temas_id = $1 and suscriptor_id = $2",
      [topic_id, user_id]
    );
    if (message_list.rows.length === 0) {
      // If empty, user is not subscribed
      return res
        .status(401)
        .json({ error: "User is not subscribed to this topic" });
    }
    client.release();
    res.status(201).send(message_list.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error getting messages" });
  }
});

// Start the Express server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
