import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { authRouter } from "./routes/auth.js";
import { apptRouter } from "./routes/appointments.js";
import { msgRouter } from "./routes/messages.js";
import { settingsRouter } from "./routes/settings.js";
import { pool } from "./db.js";

const app = express();
app.set("trust proxy", 1);

/* ============ SECURITY + BODY PARSER ============ */
app.use(helmet());
app.use(express.json());

/* ============ CORS (MUST BE BEFORE ROUTES) ============ */
const ALLOWED_ORIGINS = [
  "https://oliviaweston.co.uk",
  "https://www.oliviaweston.co.uk",
];

app.use(
  cors({
    origin: function (origin, cb) {
      // allow server-to-server / curl / postman (no Origin header)
      if (!origin) return cb(null, true);

      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);

      return cb(new Error("Not allowed by CORS: " + origin));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

// handle preflight for ALL routes
app.options("*", cors());

/* ============ RATE LIMIT ============ */
app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* ============ HEALTH ============ */
app.get("/health", (_req, res) => res.json({ ok: true }));

/* ============ ROUTES ============ */
app.use("/api/auth", authRouter);
app.use("/api/appointments", apptRouter);
app.use("/api/messages", msgRouter);
app.use("/api/settings", settingsRouter);

/* ============ DB INIT ============ */
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

  // normalize old null contexts
  await pool.query(`UPDATE appointments SET context = '' WHERE context IS NULL`);

  // ensure context not null
  await pool.query(`
    ALTER TABLE appointments
    ALTER COLUMN context SET NOT NULL
  `);

  // unique slot per date+time+context
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

  // index for availability lookups
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
