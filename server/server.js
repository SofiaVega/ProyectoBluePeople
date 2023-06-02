const express = require("express");
const cors = require("cors");
const attachId = require("./middleware/attachId");
const pool = require("./db.js");
const { Expo } = require("expo-server-sdk");

const app = express();
const expo = new Expo();

app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Test the database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Successfully connected to the database:", res.rows[0]);
  }
});

let savedTokens = [];

const handlePushTokens = ({ title, body }) => {
  let notifications = [];
  // Create the messages
  for (let pushToken of savedTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message
    notifications.push({
      to: pushToken,
      sound: "default",
      title: title,
      body: body,
      data: { body },
    });
  }

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    // Send the chunks to the Expo push notification service.
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

const saveToken = (token) => {
  console.log(token, savedTokens);
  const exists = savedTokens.find((t) => t === token);
  if (!exists) {
    savedTokens.push(token);
  }
};

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

//get token from the device
app.post("/token", (req, res) => {
  saveToken(req.body.token.value);
  console.log(`Received push token, ${req.body.token.value}`);
  res.send(`Received push token, ${req.body.token.value}`);
});

//send push notification
app.post("/sendNot/:user_id/:topic_id", attachId, async (req, res) => {
  try {
    const userId = req.params.user_id;
    const topicId = req.params.topic_id;
    const not_status = await pool.query(
      "SELECT recibirpushnot FROM tema_sus where suscriptor_id = $1 AND temas_id = $2",
      [userId, topicId]
    );
    const flag = not_status.rows[0].recibirpushnot;
    if (flag) {
      handlePushTokens(req.body);
      console.log(`Received message, with title: ${req.body.title}`);
      res.send(`Received message, with title: ${req.body.title}`);
    } else {
      res.status(200).json(flag);
    }
  } catch (err) {
    console.error("error on push not");
    console.error(err.message);
    res.sendStatus(500).json({ error: err.message });
  }
});

// register route - to do verify email
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, isAdmin } = req.body;
    console.log("ISADMIN??? ", isAdmin);
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
      "INSERT INTO usuario (nombre, email, is_admin) VALUES ($1, $2, $3) RETURNING id, is_admin",
      [name, email, isAdmin ? true : false]
    );
    //Return user ID for further authentication
    console.log(id.rows[0]);
    res.status(201).json(id.rows[0]);
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
      "SELECT id, is_admin FROM usuario WHERE email = $1",
      [email]
    );
    const users = existingUser.rows;
    if (users.length) {
      //On success return ID and admin
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
    const result = await client.query(
      "SELECT * FROM temas where admin_id = $1",
      [user_id]
    );
    const topics = result.rows;
    client.release();
    res.json(topics);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error getting topics" });
  }
});

//Get specific topic data
app.get("/api/topic/:id", attachId, async (req, res) => {
  try {
    const topic_id = req.topic_id;
    const result = await pool.query("SELECT * FROM temas where id = $1", [
      topic_id,
    ]);
    //Check if data was found
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Topic not found" });
    }
    // Extract the topic data and return
    const topic = result.rows[0];
    res.json({ topic });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error getting topic" });
  }
});

//get name from code
app.get("/api/getname/:id", attachId, async (req, res) => {
  try {
    console.log("trying to get name");
    const topic_id = req.params.id;
    const result = await pool.query("SELECT titulo FROM temas WHERE cod = $1", [
      topic_id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    console.log("result get name");
    console.log(result);
    const title = result.rows[0].titulo;
    console.log("getting name");
    console.log(title);
    res.json(title);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error getting flag" });
  }
});

//get push notification flag
app.get("/api/pushnot/:id", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    const topic_id = req.params.id;
    console.log(topic_id);
    const result = await pool.query(
      "SELECT recibirpushnot FROM tema_sus where suscriptor_id = $1 AND temas_id = $2",
      [user_id, topic_id]
    );
    //Check if data was found
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    // Extract the topic data and return
    const flag = result.rows[0].recibirpushnot;
    res.json(flag);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error getting flag" });
  }
});

//Edit flag push not
app.put("/api/editPushNot/:id", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    const topic_id = req.params.id;

    //Get body and validate
    const { recibirpushnot } = req.body;
    if (!recibirpushnot) {
      return res
        .status(400)
        .json({ error: "Flag <recibirpushnot> is required" });
    }
    //update flag
    const updatedFlag = await pool.query(
      "UPDATE tema_sus SET recibirpushnot = $1 WHERE suscriptor_id = $2 AND temas_id = $3 RETURNING *",
      [recibirpushnot, user_id, topic_id]
    );

    // Return the updated topic as the response
    res.json(updatedFlag.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error editing topic" });
  }
});

//get frec msj
app.get("/api/frecmsj/:id", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    const topic_id = req.params.id;
    const result = await pool.query(
      "SELECT frecmsj FROM tema_sus where suscriptor_id = $1 AND temas_id = $2",
      [user_id, topic_id]
    );
    //Check if data was found
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    // Extract the topic data and return
    const val = result.rows[0].frecmsj;
    res.json(val);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error getting val" });
  }
});

//Edit frec msj
app.put("/api/editfrecmsj/:id", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    const topic_id = req.params.id;

    //Get body and validate
    const { frecmsj } = req.body;
    if (!frecmsj) {
      return res.status(400).json({ error: "Flag <frecmsj> is required" });
    }
    //update flag
    const updatedFrecc = await pool.query(
      "UPDATE tema_sus SET frecmsj = $1 WHERE suscriptor_id = $2 AND temas_id = $3 RETURNING *",
      [frecmsj, user_id, topic_id]
    );

    // Return the updated topic as the response
    res.json(updatedFrecc.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error editing topic" });
  }
});

//Route for posting a notification
app.post("/api/postnotif", attachId, async (req, res) => {
  // INSERT INTO mensajes(tema_id, mensaje) VALUES (2, 'Bienvenido al tema');
  //
  console.log("post notif route");
  try {
    const user_id = req.user_id;
    const { tema_id, mensaje, pushNotifEnabled } = req.body;
    console.log(tema_id);
    console.log(mensaje);
    // check if topic exists
    const result = await pool.query("select * from temas where id = $1", [
      tema_id,
    ]);
    if (result.rowCount === 0) {
      // If ID does not exist in the database, send an error response
      console.log("could not find tema");
      return res.status(401).json({ error: "Topic not found" });
    }
    await pool.query(
      "insert into mensajes(tema_id, mensaje, push_enabled) values($1, $2, $3)",
      [tema_id, mensaje, pushNotifEnabled]
    );
    res.status(201).send({ message: "Success!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error subscribing" });
  }
});

//Route for subscribing to a topic
app.post("/api/subscribe/:userId/:id", attachId, async (req, res) => {
  try {
    const user_id = req.params.userId;
    const topic_id = req.params.id;
    //Check if topic exists
    const result = await pool.query("SELECT * FROM temas WHERE cod = $1", [
      topic_id,
    ]);
    if (result.rows.length === 0) {
      // If ID does not exist in the database, send an error response
      return res.status(401).json({ error: "Topic not found" });
    }
    const result_id = await pool.query("SELECT id FROM temas WHERE cod = $1", [
      topic_id,
    ]);
    const tema_id = result_id.rows[0].id;
    //If topic exists, create new entry in tema_sus
    const check_if_subscribed = await pool.query(
      "select * from tema_sus where suscriptor_id = $1 and temas_id = $2",
      [user_id, tema_id]
    );
    if (check_if_subscribed.rowCount === 0) {
      await pool.query(
        "INSERT INTO tema_sus (temas_id, suscriptor_id, recibirpushnot, frecmsj) VALUES ($1, $2, true, 1)",
        [tema_id, user_id]
      );
    } else {
      console.log("Duplicate entry");
      return res.status(401).json({ error: "User is already suscribed" });
    }
    res.status(201).send({ message: "Success!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error subscribing" });
  }
});

//Route for checking topics for a user
app.get("/api/subscriptions", attachId, async (req, res) => {
  try {
    const user_id = req.user_id;
    console.log("userid", user_id);
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

//Edit a topic
app.put("/api/topic/:id", attachId, async (req, res) => {
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
      res.status(401).send("No autorizado");
    }
    //Get body and validate
    const { titulo, descripcion } = req.body;
    const topic_id = req.params.id;
    if (!titulo || !descripcion) {
      return res
        .status(400)
        .json({ error: "El título y la descripción son requeridos" });
    }
    //check if topic exists
    const existingTopic = await pool.query(
      "SELECT * FROM temas WHERE id = $1",
      [topic_id]
    );
    if (existingTopic.rowCount === 0) {
      return res.status(404).json({ error: "Tema no encontrado" });
    }
    //update topic
    const updatedTopic = await pool.query(
      "UPDATE temas SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *",
      [titulo, descripcion, topic_id]
    );

    // Return the updated topic as the response
    res.json(updatedTopic.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Error editando tema" });
  }
});

//delete topic
app.delete("/api/topic/:id", attachId, async (req, res) => {
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
    //Check if topic exists
    const topicId = req.params.id;
    const existingTopic = await pool.query(
      "SELECT * FROM temas WHERE id = $1",
      [topicId]
    );

    if (existingTopic.rowCount === 0) {
      return res.status(404).json({ error: "Topic not found" });
    }

    //Delete from db
    await pool.query("DELETE FROM temas WHERE id = $1", [topicId]);
    res.json({ message: "Topic deleted successfully" });
  } catch (err) {
    // Handle any errors that may occur
    console.error(err.message);
    res.status(500).json({ error: "Error deleting topic" });
  }
});

//Delete a subscription
// Example route for deleting a subscription
app.delete(
  "/api/subscriptions/:user_id/:topic_id",
  attachId,
  async (req, res) => {
    try {
      //TODO -- Make sure normal users can't unsubscribe other users, normal users can unsubscribe from their own subscriptions and admins can remove any subscription
      const userId = req.params.user_id;
      const topicId = req.params.topic_id;
      //check if user is admin, if so they can delete any sub
      const curr_user_id = req.user_id;
      const user_status = await pool.query(
        "SELECT is_admin FROM usuario where id = $1",
        [curr_user_id]
      );
      const user_admin = user_status.rows[0].is_admin;
      //If user is not admin and the request has another user_id than its own, then they are unauthorized to delete another user's subscription
      if (!user_admin && userId != curr_user_id) {
        res.status(401).send("Unauthorized");
      }
      // Check existing subscription
      const existingSubscription = await pool.query(
        "SELECT * FROM tema_sus WHERE suscriptor_id = $1 AND temas_id = $2",
        [userId, topicId]
      );

      if (existingSubscription.rowCount === 0) {
        return res.status(404).json({ error: "Subscription not found" });
      }

      // Delete the subscription
      await pool.query(
        "DELETE FROM tema_sus WHERE suscriptor_id = $1 AND temas_id = $2",
        [userId, topicId]
      );
      res.json({ message: "Subscription deleted successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Error deleting subscription" });
    }
  }
);

// Start the Express server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
