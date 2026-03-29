import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";

export default function TutorialsList() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    // Admin needs all tutorials including drafts
    api.get("/tutorials").then((r) => setTutorials(r.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleStatus = async (t) => {
    const newStatus = t.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await api.put(`/tutorials/${t.slug}`, { status: newStatus });
    load();
  };

  const remove = async (slug) => {
    if (!confirm("¿Eliminar este tutorial?")) return;
    await api.delete(`/tutorials/${slug}`);
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tutoriales</h1>
        <Link to="/tutoriales/nuevo" className="btn-primary">+ Nuevo tutorial</Link>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : tutorials.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No hay tutoriales aún.</p>
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
              {tutorials.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{t.title}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{t.category?.name}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(t)} className={`badge px-3 py-1 text-xs cursor-pointer ${t.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {t.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                    </button>
                  </td>
                  <td className="px-4 py-3 flex gap-2 justify-end">
                    <Link to={`/tutoriales/${t.id}/editar`} className="btn-ghost text-xs">Editar</Link>
                    <button onClick={() => remove(t.slug)} className="btn-danger text-xs">Eliminar</button>
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
