import Link from "next/link";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">Código<span className="text-primary">Libre</span></span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Tu academia digital para aprender a programar con proyectos reales. Domina el desarrollo web, backend y más.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li><Link href="/cursos" className="text-gray-400 hover:text-primary transition-colors">Cursos Premium</Link></li>
              <li><Link href="/cursos-pregrabados" className="text-gray-400 hover:text-primary transition-colors">Pregrabados</Link></li>
              <li><Link href="/nosotros" className="text-gray-400 hover:text-primary transition-colors">Sobre Nosotros</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacidad" className="text-gray-400 hover:text-primary transition-colors">Privacidad</Link></li>
              <li><Link href="/terminos" className="text-gray-400 hover:text-primary transition-colors">Términos de Servicio</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-surface-border mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Código Libre. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
