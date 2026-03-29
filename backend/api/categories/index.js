import { prisma } from "../../lib/prisma.js";
import { withCors, withAuth } from "../../lib/middleware.js";

async function handler(req, res) {
  if (req.method === "GET") {
    const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
    return res.status(200).json(categories);
  }

  return withAuth(async (req, res) => {
    if (req.method !== "POST") return res.status(405).end();
    const { name, slug, description } = req.body;
    const category = await prisma.category.create({ data: { name, slug, description } });
    return res.status(201).json(category);
  })(req, res);
}

export default withCors(handler);
