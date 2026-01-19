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
  // send email to the person who submitted the message
  await sendEmail({
    to: m.email,
    subject: "Olivia Weston — Reply to your message",
    html: `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Olivia Weston — Reply</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f7f9;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f7f9;padding:24px 0;">
      <tr>
        <td align="center">
          <!-- Container -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;">
            <tr>
              <td style="padding:0 16px;">
                
                <!-- Header -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0f0f;border-radius:18px 18px 0 0;">
                  <tr>
                    <td style="padding:22px 24px;">
                      <div style="font-family:Arial,sans-serif;letter-spacing:0.18em;text-transform:uppercase;font-size:11px;color:#cfd6da;opacity:0.95;">
                        Olivia Weston
                      </div>
                      <div style="font-family:Arial,sans-serif;font-size:22px;line-height:1.25;color:#ffffff;font-weight:700;margin-top:10px;">
                        Thank you for your message
                      </div>
                      <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#cfd6da;margin-top:6px;">
                        Here is my reply below.
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Body -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:0 0 18px 18px;box-shadow:0 14px 40px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="padding:24px 24px 8px;">
                      <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1b1f23;">
                        Hi <b>${String(m.name || "there").replace(/</g, "&lt;")}</b>,
                      </div>
                    </td>
                  </tr>

                  <!-- Reply card -->
                  <tr>
                    <td style="padding:0 24px 18px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e6e8ee;border-radius:14px;">
                        <tr>
                          <td style="padding:16px 16px 14px;">
                            <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;margin-bottom:10px;">
                              My reply
                            </div>
                            <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#111827;white-space:pre-wrap;">
${replyText
  .replace(/</g, "&lt;")
  .replace(/\n/g, "<br/>")}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Original message -->
                  <tr>
                    <td style="padding:0 24px 18px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f8fb;border-radius:14px;border:1px solid #eef0f5;">
                        <tr>
                          <td style="padding:14px 16px 12px;">
                            <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;margin-bottom:8px;">
                              Your message
                            </div>
                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.7;color:#374151;white-space:pre-wrap;">
${String(m.message || "")
  .replace(/</g, "&lt;")
  .replace(/\n/g, "<br/>")}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Signature -->
                  <tr>
                    <td style="padding:0 24px 22px;">
                      <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.8;color:#111827;">
                        Warmly,<br/>
                        <b>Olivia Weston</b>
                      </div>
                      <div style="font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#6b7280;margin-top:10px;">
                        This email was sent from <span style="color:#111827;">contact@oliviaweston.co.uk</span>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:14px 24px 22px;border-top:1px solid #eef0f5;">
                      <div style="font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#6b7280;">
                        If you didn’t request this reply, you can ignore this message.
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Small spacer -->
                <div style="height:18px;"></div>

              </td>
            </tr>
          </table>
          <!-- /Container -->
        </td>
      </tr>
    </table>
  </body>
</html>
    `,
  });


  res.json({ ok: true });
});
