import { useEffect, useState } from "react";
import api from "../lib/api";
import TutorialCard from "../components/TutorialCard";

export default function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/tutorials"), api.get("/categories")])
      .then(([t, c]) => { setTutorials(t.data); setCategories(c.data); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = selected === "all" ? tutorials : tutorials.filter((t) => t.category?.slug === selected);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tutoriales</h1>
      <p className="text-gray-500 mb-8">Aprende con guías paso a paso</p>

      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setSelected("all")} className={`badge px-4 py-2 cursor-pointer transition-colors ${selected === "all" ? "bg-accent-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
          Todos
        </button>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setSelected(cat.slug)} className={`badge px-4 py-2 cursor-pointer transition-colors ${selected === cat.slug ? "bg-accent-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((i) => <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No hay tutoriales disponibles aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => <TutorialCard key={t.id} tutorial={t} />)}
        </div>
      )}
    </div>
  );
}
