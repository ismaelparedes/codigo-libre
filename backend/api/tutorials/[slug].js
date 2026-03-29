import { prisma } from "../../lib/prisma.js";
import { withCors, withAuth } from "../../lib/middleware.js";

async function handler(req, res) {
  const { slug } = req.query;

  if (req.method === "GET") {
    const tutorial = await prisma.tutorial.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!tutorial) return res.status(404).json({ error: "No encontrado" });
    return res.status(200).json(tutorial);
  }

  return withAuth(async (req, res) => {
    if (req.method === "PUT") {
      const data = req.body;
      const tutorial = await prisma.tutorial.update({ where: { slug }, data });
      return res.status(200).json(tutorial);
    }
    if (req.method === "DELETE") {
      await prisma.tutorial.delete({ where: { slug } });
      return res.status(204).end();
    }
    return res.status(405).end();
  })(req, res);
}

export default withCors(handler);
