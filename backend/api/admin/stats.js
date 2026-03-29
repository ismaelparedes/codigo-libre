import { prisma } from "../../lib/prisma.js";
import { withCors, withAuth } from "../../lib/middleware.js";

async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const [courses, tutorials, testimonials, categories] = await Promise.all([
    prisma.course.count(),
    prisma.tutorial.count(),
    prisma.testimonial.count(),
    prisma.category.count(),
  ]);

  const publishedCourses = await prisma.course.count({ where: { status: "PUBLISHED" } });
  const publishedTutorials = await prisma.tutorial.count({ where: { status: "PUBLISHED" } });

  return res.status(200).json({
    courses: { total: courses, published: publishedCourses },
    tutorials: { total: tutorials, published: publishedTutorials },
    testimonials,
    categories,
  });
}

export default withCors(withAuth(handler));
