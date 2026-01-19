import express from "express";
import { pool } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

export const msgRouter = express.Router();

/** Public: create message */
msgRouter.post("/", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "Missing fields" });

  const out = await pool.query(
    `INSERT INTO messages (name, email, message)
     VALUES ($1,$2,$3)
     RETURNING id, created_at`,
    [String(name), String(email), String(message)]
  );

  res.status(201).json({ ok: true, ...out.rows[0] });
});

/** Admin: list messages */
msgRouter.get("/", requireAdmin, async (req, res) => {
  const out = await pool.query(
    `SELECT id, name, email, message, created_at
     FROM messages
     ORDER BY created_at DESC`
  );
  res.json({ items: out.rows });
});

/** Admin: delete message */
msgRouter.delete("/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const out = await pool.query(`DELETE FROM messages WHERE id = $1 RETURNING id`, [id]);
  if (out.rowCount === 0) return res.status(404).json({ error: "Not found" });

  res.json({ ok: true, id: out.rows[0].id });
});
