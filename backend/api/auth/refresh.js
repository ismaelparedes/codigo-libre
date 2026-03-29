import { verifyRefreshToken, signAccessToken } from "../../lib/auth.js";
import { withCors } from "../../lib/middleware.js";

async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { refreshToken } = req.body || {};
  if (!refreshToken) return res.status(400).json({ error: "Token requerido" });

  try {
    const payload = verifyRefreshToken(refreshToken);
    const { iat, exp, ...data } = payload;
    const accessToken = signAccessToken(data);
    return res.status(200).json({ accessToken });
  } catch {
    return res.status(401).json({ error: "Refresh token inválido" });
  }
}

export default withCors(handler);
