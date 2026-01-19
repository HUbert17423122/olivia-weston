import express from "express";
import { pool } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";
import { sendEmail } from "../utils/sendEmail.js";

export const msgRouter = express.Router();

/**
 * Admin: list messages
 * GET /api/messages
 */
msgRouter.get("/", requireAdmin, async (req, res) => {
  const out = await pool.query(
    `SELECT id, name, email, message, created_at
     FROM messages
     ORDER BY created_at DESC`
  );
  res.json({ items: out.rows });
});

/**
 * Public: create message
 * POST /api/messages
 */
msgRouter.post("/", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const out = await pool.query(
    `INSERT INTO messages (name, email, message)
     VALUES ($1,$2,$3)
     RETURNING id, created_at`,
    [String(name).trim(), String(email).trim(), String(message).trim()]
  );

  res.status(201).json({ ok: true, ...out.rows[0] });
});

/**
 * Admin: delete message by id
 * DELETE /api/messages/:id
 */
msgRouter.delete("/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const out = await pool.query(`DELETE FROM messages WHERE id = $1 RETURNING id`, [id]);
  if (out.rowCount === 0) return res.status(404).json({ error: "Not found" });

  res.json({ ok: true, id: out.rows[0].id });
});
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
  return resend.emails.send({
    from: "Olivia Weston <contact@oliviaweston.co.uk>",
    to,
    subject,
    html,
  });
}
