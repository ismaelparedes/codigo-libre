import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/api";

const levelLabel = { BEGINNER: "Principiante", INTERMEDIATE: "Intermedio", ADVANCED: "Avanzado" };

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/courses/${slug}`).then((r) => setCourse(r.data)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="flex justify-center py-24"><div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!course) return <div className="text-center py-24 text-gray-400">Curso no encontrado. <Link to="/cursos" className="text-primary-500">Volver</Link></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/cursos" className="text-primary-500 text-sm hover:underline mb-6 inline-block">← Volver a cursos</Link>

      <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl h-64 flex items-center justify-center mb-8 overflow-hidden">
        {course.image ? (
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-8xl font-extrabold text-white opacity-20">{"</>"}</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="badge bg-primary-100 text-primary-700">{course.category?.name}</span>
        <span className="badge bg-gray-100 text-gray-600">{levelLabel[course.level]}</span>
        {course.duration && <span className="badge bg-gray-100 text-gray-600">⏱ {course.duration}</span>}
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{course.description}</p>

      <div className="bg-gray-50 rounded-2xl p-6 mb-8 flex items-center justify-between">
        <div>
          <div className="text-3xl font-extrabold text-primary-500">
            {course.isFree ? "Gratis" : `$${course.price}`}
          </div>
          <div className="text-sm text-gray-500 mt-1">Acceso completo al curso</div>
        </div>
        <a href="mailto:info@codigolibre.org?subject=Inscripción: ${course.title}" className="btn-primary">
          Inscribirme
        </a>
      </div>

      {course.content && (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: course.content }} />
      )}
    </div>
  );
}
