import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Missing credentials" });

  if (email !== process.env.ADMIN_EMAIL) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || "");
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
});
