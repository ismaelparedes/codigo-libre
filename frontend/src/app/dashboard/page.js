import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlayCircle, CheckCircle2 } from "lucide-react";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  // Obtener cursos a los que está inscrito el estudiante
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    include: {
      course: true,
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 flex items-center gap-6">
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name}
            className="w-20 h-20 rounded-full border-4 border-surface-border shadow-lg"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">Bienvenido, {session.user.name}</h1>
          <p className="text-gray-400 mt-1">Aquí tienes tu progreso y tus cursos adquiridos.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Mis Cursos</h2>
      {enrollments.length === 0 ? (
        <div className="glass p-10 rounded-2xl text-center">
          <p className="text-gray-400 mb-4">Aún no estás inscrito en ningún curso.</p>
          <Link href="/cursos" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-semibold transition-colors">
            Explorar Cursos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => (
            <Link href={`/dashboard/cursos/${enrollment.course.slug}`} key={enrollment.id} className="block group">
              <div className="glass rounded-2xl overflow-hidden transition-transform group-hover:-translate-y-1">
                {enrollment.course.image ? (
                  <img src={enrollment.course.image} alt={enrollment.course.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-surface-border flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-gray-500" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{enrollment.course.title}</h3>
                  
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progreso</span>
                    <span className="font-medium text-white">{enrollment.progress}%</span>
                  </div>
                  <div className="w-full bg-surface-border rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
