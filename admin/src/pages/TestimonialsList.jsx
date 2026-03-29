import { useEffect, useState } from "react";
import api from "../lib/api";

export default function TestimonialsList() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", content: "", avatar: "" });
  const [saving, setSaving] = useState(false);

  const load = () => api.get("/testimonials").then((r) => setTestimonials(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await api.post("/testimonials", form);
    setForm({ name: "", role: "", content: "", avatar: "" });
    await load();
    setSaving(false);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Testimonios</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 shadow-sm mb-6 space-y-3">
        <h2 className="font-semibold text-gray-700">Nuevo testimonio</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Nombre *</label>
            <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Rol / Curso</label>
            <input className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Linux SQL+PLSQL" />
          </div>
        </div>
        <div>
          <label className="label">Testimonio *</label>
          <textarea className="input resize-none" rows={3} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </div>
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Guardando..." : "Agregar"}
        </button>
      </form>

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600 italic mb-2">"{t.content}"</p>
            <div className="font-semibold text-sm text-gray-900">{t.name}</div>
            <div className="text-xs text-primary-500">{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
