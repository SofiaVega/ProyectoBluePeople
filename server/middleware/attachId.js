const pool = require("../db.js");

const attachId = async (req, res, next) => {
  const user_id = req.headers["x-user-id"];
  console.log("USUARIIII ", user_id)
  if (!user_id) {
    return res.status(400).json({ error: "User not logged." });
  }
  // Check if ID exists in the database
  try {
    const result = await pool.query("SELECT * FROM usuario WHERE id = $1", [
      user_id,
    ]);
    if (result.rows.length === 0) {
      // If ID does not exist in the database, send an error response
      return res.status(401).json({ error: "User not found" });
    }
  } catch (err) {
    // Handle database error
    console.error("Error checking email in database:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  req.user_id = user_id;
  next();
};

module.exports = attachId;
