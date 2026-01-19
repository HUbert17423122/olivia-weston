import express from "express";
import { pool } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

export const settingsRouter = express.Router();

/**
 * Public: get booking enabled flag
 * GET /api/settings/booking
 */
settingsRouter.get("/booking", async (_req, res) => {
  const out = await pool.query(`SELECT value FROM settings WHERE key='booking_enabled' LIMIT 1`);
  const enabled = (out.rows[0]?.value ?? "true") === "true";
  res.json({ enabled });
});

/**
 * Admin: set booking enabled flag
 * PATCH /api/settings/booking
 * body: { enabled: true/false }
 */
settingsRouter.patch("/booking", requireAdmin, async (req, res) => {
  const enabled = !!req.body?.enabled;

  await pool.query(
    `
    INSERT INTO settings (key, value)
    VALUES ('booking_enabled', $1)
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `,
    [enabled ? "true" : "false"]
  );

  res.json({ ok: true, enabled });
});
