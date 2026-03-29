import { prisma } from "../../lib/prisma.js";
import { withCors, withAuth } from "../../lib/middleware.js";

async function handler(req, res) {
  if (req.method === "GET") {
    const testimonials = await prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(testimonials);
  }

  return withAuth(async (req, res) => {
    if (req.method !== "POST") return res.status(405).end();
    const { name, role, content, avatar } = req.body;
    const t = await prisma.testimonial.create({ data: { name, role, content, avatar } });
    return res.status(201).json(t);
  })(req, res);
}

export default withCors(handler);
