"use client";
import Link from "next/link";
import { Menu, X, Terminal } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass border-b-0 border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Terminal className="w-8 h-8 text-primary" />
            <Link href="/" className="font-bold text-xl tracking-tight">
              Código<span className="text-primary">Libre</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/nosotros" className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Nosotros</Link>
              <Link href="/cursos" className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Cursos Premium</Link>
              <Link href="/cursos-pregrabados" className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Cursos Pregrabados</Link>
              <Link href="https://project-qncn9.vercel.app/login" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Iniciar Sesión
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-surface-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/nosotros" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Nosotros</Link>
            <Link href="/cursos" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Cursos Premium</Link>
            <Link href="/cursos-pregrabados" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Cursos Pregrabados</Link>
            <Link href="https://project-qncn9.vercel.app/login" className="bg-primary text-white block px-3 py-2 rounded-md text-base font-medium mt-4">Iniciar Sesión</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
