const { Pool } = require("pg");

// Create a new database connection pool
const pool = new Pool({
  user: "postgres",
  database: "notifydb",
  password: "grow",
});

// Export the pool object so that it can be imported and used in other files
module.exports = pool;
