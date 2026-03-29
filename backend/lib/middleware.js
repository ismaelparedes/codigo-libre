import { verifyAccessToken, extractToken } from "./auth.js";

// Rate limiting store (in-memory, resets on cold start - fine for serverless)
const loginAttempts = new Map();

export function withAuth(handler) {
  return async (req, res) => {
    const token = extractToken(req);
    if (!token) return res.status(401).json({ error: "No autorizado" });

    try {
      const payload = verifyAccessToken(token);
      req.user = payload;
      return handler(req, res);
    } catch {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
  };
}

export function withCors(handler) {
  return async (req, res) => {
    const allowed = (process.env.ALLOWED_ORIGINS || "").split(",");
    const origin = req.headers.origin;

    const isVercel = origin && origin.endsWith(".vercel.app");
    const isLocalhost = origin && origin.startsWith("http://localhost:");

    if (!origin || allowed.includes(origin) || isVercel || isLocalhost) {
      res.setHeader("Access-Control-Allow-Origin", origin || "*");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") return res.status(200).end();
    return handler(req, res);
  };
}

export function rateLimit(key, max = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const entry = loginAttempts.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }

  entry.count++;
  loginAttempts.set(key, entry);

  return entry.count > max;
}
