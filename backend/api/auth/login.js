import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
import { signAccessToken, signRefreshToken } from "../../lib/auth.js";
import { withCors, rateLimit } from "../../lib/middleware.js";

async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "Email y contraseña requeridos" });

  // Rate limit by IP
  const ip = req.headers["x-forwarded-for"] || "unknown";
  if (rateLimit(`login:${ip}`, 5, 15 * 60 * 1000))
    return res.status(429).json({ error: "Demasiados intentos. Espera 15 minutos." });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });

  const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return res.status(200).json({ accessToken, refreshToken, user: payload });
}

export default withCors(handler);
