import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hash = await bcrypt.hash("Admin123!", 12);
  await prisma.user.upsert({
    where: { email: "admin@codigolibre.org" },
    update: {},
    create: { email: "admin@codigolibre.org", password: hash, name: "Administrador", role: "ADMIN" },
  });

  // Categories
  const cats = [
    { name: "Linux", slug: "linux", description: "Administración de sistemas Linux" },
    { name: "Bases de Datos", slug: "bases-de-datos", description: "SQL, PL/SQL, Oracle, PostgreSQL" },
    { name: "Java", slug: "java", description: "Desarrollo con Java" },
    { name: "PHP", slug: "php", description: "Desarrollo web con PHP" },
    { name: "Servidores", slug: "servidores", description: "Administración de servidores" },
  ];

  for (const cat of cats) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
  }

  // Testimonials
  const testimonials = [
    { name: "Miguel Tejada", role: "Linux SQL+PLSQL Servidores", content: "Estudiar en ACL ha sobrepasado mis expectativas. Gracias a las habilidades aprendidas hoy puedo desempeñar una buena posición como SysAdmin." },
    { name: "Jorge L. Morla", role: "Java Expert", content: "Imparten excelentes cursos, los profesores están altamente capacitados. Siento una gran diferencia antes y después de haber estudiado allí. Ahora soy Instructor de Java." },
    { name: "Nancy Campusano", role: "Linux SQL+PLSQL DBA", content: "Estudiar en Código Libre ha sido una experiencia enriquecedora. Nos preparan para afrontar los retos del ambiente laboral con instructores siempre disponibles." },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t }).catch(() => {});
  }

  console.log("✅ Seed completado");
}

main().catch(console.error).finally(() => prisma.$disconnect());
