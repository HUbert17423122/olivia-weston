import express from "express";
import { pool } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

export const apptRouter = express.Router();

/**
 * Public: availability for a given date + context
 * GET /api/appointments/availability?date=...&context=...
 * Returns: { taken: ["09:00", "10:30"] }
 */
apptRouter.get("/availability", async (req, res) => {
  const { date, context } = req.query || {};
  if (!date || !context) return res.status(400).json({ error: "Missing date or context" });

  const out = await pool.query(
    `SELECT time
     FROM appointments
     WHERE date = $1 AND context = $2
     ORDER BY time ASC`,
    [String(date), String(context)]
  );

  res.json({ taken: out.rows.map((r) => r.time) });
});

/**
 * Public: create appointment request (called by your booking modal)
 * Store: name, phone, email, date, time, context
 * Blocks duplicate bookings for same date+time+context
 */

// Public: get taken slots for date + context
apptRouter.get("/availability", async (req, res) => {
  const { date, context } = req.query || {};
  if (!date) return res.status(400).json({ error: "Missing date" });

  const out = await pool.query(
    `SELECT time FROM appointments
     WHERE date = $1 AND COALESCE(context,'') = COALESCE($2,'')
     ORDER BY time ASC`,
    [date, context || ""]
  );

  res.json({ taken: out.rows.map(r => r.time) });
});

apptRouter.post("/", async (req, res) => {
  const { name, phone, email, date, time, context } = req.body || {};
  if (!name || !phone || !date || !time || !context) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const q = `
      INSERT INTO appointments (name, phone, email, date, time, context)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING id, created_at
    `;
    const vals = [name, phone, email || null, date, time, context];
    const out = await pool.query(q, vals);
    return res.status(201).json({ ok: true, ...out.rows[0] });
  } catch (e) {
    // Postgres unique violation
    if (e && e.code === "23505") {
      return res.status(409).json({ error: "This slot is already booked." });
    }
    console.error("Create appointment failed:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

/**
 * Admin: list appointments
 */
apptRouter.get("/", requireAdmin, async (req, res) => {
  const out = await pool.query(
    `SELECT id, name, phone, email, date, time, context, created_at
     FROM appointments
     ORDER BY created_at DESC`
  );
  res.json({ items: out.rows });
});
/**
 * Admin: delete appointment by id
 */
apptRouter.delete("/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const out = await pool.query(`DELETE FROM appointments WHERE id = $1 RETURNING id`, [id]);
  if (out.rowCount === 0) return res.status(404).json({ error: "Not found" });

  res.json({ ok: true, id: out.rows[0].id });
});


