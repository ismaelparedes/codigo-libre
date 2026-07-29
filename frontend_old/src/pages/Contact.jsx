import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // mailto fallback - replace with API call when email service is configured
    window.location.href = `mailto:info@codigolibre.org?subject=Contacto de ${form.name}&body=${form.message}`;
    setSent(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacto</h1>
      <p className="text-gray-500 mb-8">¿Tienes preguntas? Escríbenos.</p>

      {sent ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="font-bold text-green-800">¡Mensaje enviado!</h3>
          <p className="text-green-600 mt-2">Te responderemos pronto.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              placeholder="¿En qué podemos ayudarte?"
            />
          </div>
          <button type="submit" className="btn-primary w-full text-center">
            Enviar mensaje
          </button>
        </form>
      )}

      <div className="mt-10 text-center text-gray-500 text-sm">
        También puedes escribirnos directamente a{" "}
        <a href="mailto:info@codigolibre.org" className="text-primary-500 hover:underline">
          info@codigolibre.org
        </a>
      </div>
    </div>
  );
}
