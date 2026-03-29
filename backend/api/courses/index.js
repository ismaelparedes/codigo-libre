import { prisma } from "../../lib/prisma.js";
import { withCors, withAuth } from "../../lib/middleware.js";

async function handler(req, res) {
  if (req.method === "GET") {
    const { status, category, featured } = req.query;
    const where = {};
    // Public only sees published unless authenticated
    const token = req.headers.authorization;
    if (!token) where.status = "PUBLISHED";
    if (status) where.status = status;
    if (category) where.category = { slug: category };
    if (featured) where.featured = featured === "true";

    const courses = await prisma.course.findMany({
      where,
      include: { category: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(courses);
  }

  // POST requires auth
  return withAuth(async (req, res) => {
    if (req.method !== "POST") return res.status(405).end();
    const { title, slug, description, content, image, price, isFree, status, featured, duration, level, categoryId } = req.body;
    const course = await prisma.course.create({
      data: { title, slug, description, content, image, price: price || 0, isFree: isFree || false, status: status || "DRAFT", featured: featured || false, duration, level: level || "BEGINNER", categoryId },
    });
    return res.status(201).json(course);
  })(req, res);
}

export default withCors(handler);
