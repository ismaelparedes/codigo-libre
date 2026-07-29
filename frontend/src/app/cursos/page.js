"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function PremiumCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        // Filter only premium/live courses if we had that flag, for now show all that aren't cheap
        setCourses(res.data.filter(c => c.price > 50)); 
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
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Cursos <span className="text-primary">Premium</span></h1>
        <p className="text-xl text-gray-400">Domina el desarrollo con clases intensivas, soporte directo y proyectos del mundo real.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length === 0 ? (
            <p className="text-gray-400 col-span-full">Próximamente nuevos cursos premium...</p>
          ) : (
            courses.map((course, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={course.id} 
                className="glass rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform"
              >
                <div className="h-48 bg-surface-border relative">
                  {course.image ? (
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {course.level}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">{course.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration || "Por definir"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-white">${course.price}</span>
                    </div>
                  </div>

                  <Link 
                    href={`/cursos/${course.slug}`}
                    className="w-full block text-center bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Ver Detalles
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
