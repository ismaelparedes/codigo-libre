import { prisma } from "../../lib/prisma.js";
import { withCors, withAuth } from "../../lib/middleware.js";

async function handler(req, res) {
  if (req.method === "GET") {
    const { category, featured } = req.query;
    const where = { status: "PUBLISHED" };
    if (category) where.category = { slug: category };
    if (featured) where.featured = featured === "true";

    const tutorials = await prisma.tutorial.findMany({
      where,
      include: { category: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(tutorials);
  }

  return withAuth(async (req, res) => {
    if (req.method !== "POST") return res.status(405).end();
    const { title, slug, excerpt, content, image, status, featured, categoryId } = req.body;
    const tutorial = await prisma.tutorial.create({
      data: { title, slug, excerpt, content, image, status: status || "DRAFT", featured: featured || false, categoryId },
    });
    return res.status(201).json(tutorial);
  })(req, res);
}

export default withCors(handler);
