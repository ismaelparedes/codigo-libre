import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CoursesList from "./pages/courses/CoursesList";
import CourseForm from "./pages/courses/CourseForm";
import TutorialsList from "./pages/tutorials/TutorialsList";
import TutorialForm from "./pages/tutorials/TutorialForm";
import CategoriesList from "./pages/CategoriesList";
import TestimonialsList from "./pages/TestimonialsList";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/cursos" element={<CoursesList />} />
                  <Route path="/cursos/nuevo" element={<CourseForm />} />
                  <Route path="/cursos/:id/editar" element={<CourseForm />} />
                  <Route path="/tutoriales" element={<TutorialsList />} />
                  <Route path="/tutoriales/nuevo" element={<TutorialForm />} />
                  <Route path="/tutoriales/:id/editar" element={<TutorialForm />} />
                  <Route path="/categorias" element={<CategoriesList />} />
                  <Route path="/testimonios" element={<TestimonialsList />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
