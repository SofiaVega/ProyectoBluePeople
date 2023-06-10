const { Pool } = require("pg");

// Create a new database connection pool
const pool = new Pool({
  user: "blueppl",
  database: "notify_vo0t",
  password: "RRl6nE4TNfacsO4CFdSIqcQk4gr4xds5",
  host: "dpg-cht2svbhp8u4v7scb9jg-a.ohio-postgres.render.com",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Skip SSL certificate validation (not recommended for production)
  },
});

// Export the pool object so that it can be imported and used in other files
module.exports = pool;
