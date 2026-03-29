import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.get("/courses").then((r) => setCourses(r.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleStatus = async (course) => {
    const newStatus = course.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await api.put(`/courses/${course.slug}`, { status: newStatus });
    load();
  };

  const remove = async (slug) => {
    if (!confirm("¿Eliminar este curso?")) return;
    await api.delete(`/courses/${slug}`);
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cursos</h1>
        <Link to="/cursos/nuevo" className="btn-primary">+ Nuevo curso</Link>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No hay cursos aún.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Título</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Categoría</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.title}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{c.category?.name}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(c)} className={`badge px-3 py-1 text-xs cursor-pointer ${c.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {c.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                    </button>
                  </td>
                  <td className="px-4 py-3 flex gap-2 justify-end">
                    <Link to={`/cursos/${c.id}/editar`} className="btn-ghost text-xs">Editar</Link>
                    <button onClick={() => remove(c.slug)} className="btn-danger text-xs">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
