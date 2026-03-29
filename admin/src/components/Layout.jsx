import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const nav = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/cursos", label: "Cursos", icon: "📚" },
  { to: "/tutoriales", label: "Tutoriales", icon: "📝" },
  { to: "/categorias", label: "Categorías", icon: "🏷️" },
  { to: "/testimonios", label: "Testimonios", icon: "💬" },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/login"); };

  const Sidebar = () => (
    <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-green-400">{"</>"}</span>
          <span className="font-bold">Código Libre</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">Panel de administración</div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? "bg-green-700 text-white" : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="text-sm text-gray-400 mb-2">{user?.name}</div>
        <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 transition-colors">
          Cerrar sesión
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="flex">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between md:justify-end">
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm text-gray-500">Hola, {user?.name}</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
