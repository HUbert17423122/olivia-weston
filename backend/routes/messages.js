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

/**
 * Admin: reply to a message (sends email via Resend)
 * POST /api/messages/:id/reply
 * Body: { reply: "..." }
 */
msgRouter.post("/:id/reply", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const { reply } = req.body || {};
  if (!reply || !String(reply).trim()) {
    return res.status(400).json({ error: "Missing reply" });
  }

  const out = await pool.query(
    `SELECT id, name, email, message, created_at
     FROM messages
     WHERE id = $1`,
    [id]
  );

  if (out.rowCount === 0) return res.status(404).json({ error: "Not found" });

  const m = out.rows[0];
  const replyText = String(reply).trim();

  // send email to the person who submitted the message
  await sendEmail({
    to: m.email,
    subject: "Reply from Olivia Weston",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <p>Hi ${m.name || "there"},</p>

        <p>${replyText.replace(/</g, "&lt;").replace(/\n/g, "<br/>")}</p>

        <hr style="border:none;border-top:1px solid #eee;margin:18px 0"/>

        <p style="color:#666;font-size:13px;margin:0"><b>Your message:</b></p>
        <p style="color:#666;font-size:13px;margin-top:6px;white-space:pre-wrap">
          ${String(m.message || "").replace(/</g, "&lt;")}
        </p>

        <p style="margin-top:18px">— Olivia Weston</p>
      </div>
    `,
  });

  res.json({ ok: true });
});
