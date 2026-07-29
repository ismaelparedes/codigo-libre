"use client";

import { motion } from "framer-motion";
import { Terminal, Users, Target, BookOpen } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="py-16">
      {/* Header */}
      <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold mb-6">Sobre <span className="text-primary">Código Libre Dominicano</span></h1>
          <p className="text-xl text-gray-400">
            Somos la academia líder en República Dominicana especializada en la formación de expertos en Tecnologías Abiertas, Linux y Administración de Bases de Datos.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass p-10 rounded-3xl">
            <Target className="w-10 h-10 text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-4">Nuestra Especialidad</h2>
            <p className="text-gray-400 leading-relaxed">
              Vamos más allá de la programación básica. Entrenamos a nuestros estudiantes en la administración de infraestructuras críticas: GNU/Linux, servidores Unix, motores Oracle y soluciones corporativas Open Source.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass p-10 rounded-3xl">
            <BookOpen className="w-10 h-10 text-secondary mb-6" />
            <h2 className="text-2xl font-bold mb-4">Facilidad de Becas</h2>
            <p className="text-gray-400 leading-relaxed">
              Creemos firmemente en el acceso a la educación tecnológica. Contamos con un programa activo de becas y facilidades de pago para garantizar que el talento dominicano no se detenga por falta de recursos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Highlight */}
      <section className="bg-surface border-y border-surface-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 text-center md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-extrabold text-white mb-2">+5,500</div>
              <div className="text-gray-500">Estudiantes Formados</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">Expertos</div>
              <div className="text-gray-500">Instructores Calificados</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-secondary mb-2">100%</div>
              <div className="text-gray-500">Enfoque Open Source</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
