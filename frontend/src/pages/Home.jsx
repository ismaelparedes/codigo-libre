import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import CourseCard from "../components/CourseCard";
import TutorialCard from "../components/TutorialCard";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api.get("/courses?featured=true").then((r) => setCourses(r.data.slice(0, 3))).catch(() => {});
    api.get("/tutorials?featured=true").then((r) => setTutorials(r.data.slice(0, 3))).catch(() => {});
    api.get("/testimonials").then((r) => setTestimonials(r.data.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-accent-600 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-6xl font-extrabold opacity-20 block mb-4">{"</>"}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Tecnología del futuro,<br />
            <span className="text-green-300">aprendida hoy</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Cursos prácticos de Linux, Java, SQL, Servidores y más. Formación real para el mundo laboral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cursos" className="bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors">
              Ver cursos
            </Link>
            <Link to="/tutoriales" className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors">
              Tutoriales gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[["10+", "Años de experiencia"], ["500+", "Estudiantes graduados"], ["15+", "Cursos disponibles"], ["100%", "Enfoque práctico"]].map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl font-extrabold text-primary-500">{n}</div>
              <div className="text-sm text-gray-500 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      {courses.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Cursos destacados</h2>
              <Link to="/cursos" className="text-primary-500 font-semibold hover:underline">Ver todos →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </div>
        </section>
      )}

      {/* Featured Tutorials */}
      {tutorials.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Últimos tutoriales</h2>
              <Link to="/tutoriales" className="text-accent-500 font-semibold hover:underline">Ver todos →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((t) => <TutorialCard key={t.id} tutorial={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Lo que dicen nuestros estudiantes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <p className="text-gray-600 italic mb-4">"{t.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-sm text-primary-500">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-primary-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
        <p className="text-green-100 mb-8 max-w-xl mx-auto">Únete a cientos de profesionales que ya transformaron su carrera con Código Libre.</p>
        <Link to="/cursos" className="bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors">
          Ver cursos disponibles
        </Link>
      </section>
    </>
  );
}
