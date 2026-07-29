import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-extrabold text-primary-500">{"</>"}</span>
              <span className="text-xl font-bold text-white">Código Libre</span>
            </div>
            <p className="text-sm text-gray-400">
              Formación tecnológica de calidad para el mundo real.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Navegación</h4>
            <ul className="space-y-2 text-sm">
              {[["Cursos", "/cursos"], ["Tutoriales", "/tutoriales"], ["Nosotros", "/nosotros"], ["Contacto", "/contacto"]].map(([label, to]) => (
                <li key={to}><Link to={to} className="hover:text-primary-500 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Contacto</h4>
            <p className="text-sm text-gray-400">info@codigolibre.org</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Código Libre. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
