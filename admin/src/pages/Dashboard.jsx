import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then((r) => setStats(r.data)).catch(() => {});
  }, []);

  const cards = stats
    ? [
        { label: "Cursos publicados", value: `${stats.courses.published}/${stats.courses.total}`, icon: "📚", to: "/cursos" },
        { label: "Tutoriales publicados", value: `${stats.tutorials.published}/${stats.tutorials.total}`, icon: "📝", to: "/tutoriales" },
        { label: "Testimonios", value: stats.testimonials, icon: "💬", to: "/testimonios" },
        { label: "Categorías", value: stats.categories, icon: "🏷️", to: "/categorias" },
      ]
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats === null
          ? [1,2,3,4].map((i) => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)
          : cards.map((c) => (
              <Link key={c.label} to={c.to} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{c.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{c.value}</div>
                <div className="text-sm text-gray-500 mt-1">{c.label}</div>
              </Link>
            ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/cursos/nuevo" className="bg-green-50 border-2 border-dashed border-green-300 rounded-xl p-6 text-center hover:bg-green-100 transition-colors">
          <div className="text-3xl mb-2">📚</div>
          <div className="font-semibold text-green-700">Nuevo curso</div>
        </Link>
        <Link to="/tutoriales/nuevo" className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:bg-blue-100 transition-colors">
          <div className="text-3xl mb-2">📝</div>
          <div className="font-semibold text-blue-700">Nuevo tutorial</div>
        </Link>
      </div>
    </div>
  );
}
