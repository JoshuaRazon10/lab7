// ============================================================
// SE2 Lab 7 – Mood Tracker API (server.js)
// With logging, security, health check, rate limiting & morgan
// ============================================================
require("dotenv").config(); // Load .env variables (Part 3 – no hardcoded credentials)

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const { Pool: PgPool } = require("pg"); // Extra Credit - PostgreSQL support for Render
const morgan = require("morgan");             // Extra Credit – request logging

const rateLimit = require("express-rate-limit"); // Extra Credit – rate limiting

const app = express();
const PORT = process.env.PORT || 3000;

// Enable proxy trust for production (Render/Railway)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// ── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Extra Credit: Morgan – automated, professional-grade request logging
app.use(morgan("dev"));

// Extra Credit: Rate Limiting – prevent API abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // limit each IP to 100 requests per window
  message: { error: "Too many requests. Please try again later." }
});
app.use(limiter);

// ── Database Connection ─────────────────────────────────────
// Support for both MySQL and PostgreSQL
let db;
const usePostgres = process.env.DB_TYPE === "postgres" || process.env.DB_PORT === "5432" || process.env.DATABASE_URL;

if (usePostgres) {
  console.log("Using PostgreSQL connection");
  const pgPool = new PgPool({
    connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
  });

  db = {
    query: async (text, params) => {
      // Map ? to $1, $2, etc. for PostgreSQL portability
      let index = 0;
      const pgText = text.replace(/\?/g, () => `$${++index}`);
      const result = await pgPool.query(pgText, params);
      return [result.rows, result];
    }
  };
} else {
  console.log("Using MySQL connection");
  const mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10
  });

  db = {
    query: (text, params) => mysqlPool.query(text, params)
  };
}

// ── Part 0.2 – POST /mood  (with logging) ───────────────────
app.post("/mood", async (req, res) => {
  console.log("POST /mood request received");       // Log that the route was hit
  console.log("Request body:", req.body);            // Log the incoming payload

  const mood = req.body.mood;

  if (!mood) {
    console.log("Error: mood field is missing from request body");
    return res.status(400).json({ error: "Mood is required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO mood_log (mood) VALUES (?)",      // Portability: db.query handles ? to $1 for PG
      [mood]
    );
    // Adjust result handling as MySQL and PG return different result structures
    const insertId = result.insertId || (result[0] && result[0].id) || null;
    console.log("Database insert result:", result);  // Log DB result
    res.json({ message: "Mood saved successfully", id: insertId });
  } catch (err) {
    console.error("Database error:", err.message);   // Log DB errors
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// ── GET /moods – Fetch mood history ─────────────────────────
app.get("/moods", async (req, res) => {
  console.log("GET /moods request received");

  try {
    const [rows] = await db.query(
      "SELECT * FROM mood_log ORDER BY created_at DESC"
    );
    console.log("Moods fetched:", rows.length, "records");
    res.json(rows);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// ── Part 4 – Health Check Endpoint ──────────────────────────
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API running"
  });
});

// ── Start Server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Mood Tracker API running on http://localhost:${PORT}`);
});
