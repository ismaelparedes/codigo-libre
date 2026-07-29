"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlayCircle, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function PreRecordedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        // Filter cheap/pre-recorded courses (assuming < 50 for now based on previous logic)
        setCourses(res.data.filter(c => c.price <= 50)); 
      } catch (error) {
        console.error("Error fetching courses", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 border-b border-surface-border pb-8">
        <h1 className="text-4xl font-bold mb-4">Cursos <span className="text-secondary">Pregrabados</span></h1>
        <p className="text-xl text-gray-400">Aprende a tu propio ritmo con nuestros cursos pregrabados, accesibles y directos al grano.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.length === 0 ? (
            <p className="text-gray-400 col-span-full">Aún no hay cursos pregrabados disponibles.</p>
          ) : (
            courses.map((course, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={course.id} 
                className="glass rounded-xl overflow-hidden flex flex-col hover:border-secondary/50 transition-colors"
              >
                <div className="h-40 bg-surface-border relative group cursor-pointer">
                  {course.image ? (
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 bg-surface">
                      <PlayCircle className="w-10 h-10 group-hover:text-secondary transition-colors" />
                    </div>
                  )}
                  {course.isFree && (
                    <div className="absolute top-3 left-3 bg-primary text-black text-xs font-bold px-2 py-1 rounded">
                      GRATIS
                    </div>
                  )}
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-white">
                      {course.isFree ? "Gratis" : `$${course.price}`}
                    </div>
                  </div>

                  <Link 
                    href={`/cursos-pregrabados/${course.slug}`}
                    className="w-full block text-center bg-surface-border text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-secondary hover:text-white transition-colors"
                  >
                    Empezar Curso
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
