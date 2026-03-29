import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/api";

const defaultForm = { title: "", slug: "", description: "", content: "", image: "", price: 0, isFree: false, status: "DRAFT", featured: false, duration: "", level: "BEGINNER", categoryId: "" };

function toSlug(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data));
    if (id) {
      // Load by id - we need to find by id from list
      api.get("/courses").then((r) => {
        const course = r.data.find((c) => c.id === id);
        if (course) setForm({ ...defaultForm, ...course, categoryId: course.categoryId || "" });
      });
    }
  }, [id]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (id) {
        await api.put(`/courses/${form.slug}`, form);
      } else {
        await api.post("/courses", form);
      }
      navigate("/cursos");
    } catch (err) {
      setError(err.response?.data?.error || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{id ? "Editar curso" : "Nuevo curso"}</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl p-6 shadow-sm">
        <div>
          <label className="label">Título *</label>
          <input className="input" required value={form.title} onChange={(e) => { set("title", e.target.value); if (!id) set("slug", toSlug(e.target.value)); }} />
        </div>
        <div>
          <label className="label">Slug *</label>
          <input className="input" required value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        </div>
        <div>
          <label className="label">Descripción *</label>
          <textarea className="input resize-none" rows={3} required value={form.description} onChange={(e) => set("description", e.target.value)} />
        </div>
        <div>
          <label className="label">Contenido (HTML)</label>
          <textarea className="input resize-none font-mono text-xs" rows={8} value={form.content} onChange={(e) => set("content", e.target.value)} placeholder="<p>Contenido del curso...</p>" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Categoría *</label>
            <select className="input" required value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}>
              <option value="">Seleccionar...</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Nivel</label>
            <select className="input" value={form.level} onChange={(e) => set("level", e.target.value)}>
              <option value="BEGINNER">Principiante</option>
              <option value="INTERMEDIATE">Intermedio</option>
              <option value="ADVANCED">Avanzado</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Precio ($)</label>
            <input type="number" min="0" step="0.01" className="input" value={form.price} onChange={(e) => set("price", parseFloat(e.target.value))} />
          </div>
          <div>
            <label className="label">Duración</label>
            <input className="input" placeholder="ej: 40 horas" value={form.duration} onChange={(e) => set("duration", e.target.value)} />
          </div>
        </div>
        <div>
          <label className="label">URL de imagen</label>
          <input className="input" type="url" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.isFree} onChange={(e) => set("isFree", e.target.checked)} className="rounded" />
            Gratis
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="rounded" />
            Destacado
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.status === "PUBLISHED"} onChange={(e) => set("status", e.target.checked ? "PUBLISHED" : "DRAFT")} className="rounded" />
            Publicado
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button type="button" onClick={() => navigate("/cursos")} className="btn-ghost">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
