function attachId(req, res, next) {
  const user_id = req.headers["x-user-id"];
  if (!user_id) {
    return res.status(400).json({ error: "User not logged." });
  }
  req.user_id = user_id;
  next();
}

module.exports = attachId;
