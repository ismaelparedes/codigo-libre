import { useEffect, useState } from "react";
import api from "../lib/api";

function toSlug(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", slug: "", description: "" });
  const [saving, setSaving] = useState(false);

  const load = () => api.get("/categories").then((r) => setCategories(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await api.post("/categories", form);
    setForm({ name: "", slug: "", description: "" });
    await load();
    setSaving(false);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Categorías</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 shadow-sm mb-6 space-y-3">
        <h2 className="font-semibold text-gray-700">Nueva categoría</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Nombre *</label>
            <input className="input" required value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value, slug: toSlug(e.target.value) }); }} />
          </div>
          <div>
            <label className="label">Slug *</label>
            <input className="input" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="label">Descripción</label>
          <input className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Guardando..." : "Agregar"}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {categories.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No hay categorías.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Nombre</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{c.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
