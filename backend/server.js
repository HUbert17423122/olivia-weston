import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { authRouter } from "./routes/auth.js";
import { apptRouter } from "./routes/appointments.js";
import { pool } from "./db.js";
import { msgRouter } from "./routes/messages.js";
import { settingsRouter } from "./routes/settings.js";


const app = express();
app.set("trust proxy", 1);

app.use(helmet());
app.use(express.json());
app.use("/api/settings", settingsRouter);

const allow = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: [
      "https://oliviaweston.co.uk",
      "https://www.oliviaweston.co.uk"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);


app.options("*", cors());



// respond to preflight requests
app.options("*", cors());


app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/api/auth", authRouter);
app.use("/api/appointments", apptRouter);
app.use("/api/messages", msgRouter);

// Basic DB init (run once on start)
// Basic DB init (run once on start)
async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS appointments (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      context TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // default: booking enabled
  await pool.query(`
    INSERT INTO settings (key, value)
    VALUES ('booking_enabled', 'true')
    ON CONFLICT (key) DO NOTHING
  `);

  // Ensure context is NOT NULL (your schema currently allows null)
  // If you already have rows with null context, this will fail.
  // So we normalize null context to empty string first:
  await pool.query(`UPDATE appointments SET context = '' WHERE context IS NULL`);

  // Alter column to NOT NULL if not already
  await pool.query(`
    ALTER TABLE appointments
    ALTER COLUMN context SET NOT NULL
  `);

  // Add unique constraint to prevent double booking of same service+date+time
  await pool.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'appointments_unique_slot'
      ) THEN
        ALTER TABLE appointments
        ADD CONSTRAINT appointments_unique_slot UNIQUE (date, time, context);
      END IF;
    END$$;
  `);

  // Optional performance index (availability lookups)
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_appointments_availability
    ON appointments (date, context);
  `);
}


const port = Number(process.env.PORT || 8080);
init()
  .then(() => app.listen(port, () => console.log("API listening on", port)))
  .catch((e) => {
    console.error("Init failed", e);
    process.exit(1);
  });






