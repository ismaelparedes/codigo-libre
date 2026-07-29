"use client";

import { motion } from "framer-motion";
import { Terminal, Users, Target, Code } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="py-16">
      {/* Header */}
      <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold mb-6">Sobre <span className="text-primary">Código Libre</span></h1>
          <p className="text-xl text-gray-400">
            Nacimos con una misión clara: democratizar la educación en tecnología y formar a la próxima generación de ingenieros de software con proyectos del mundo real.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass p-10 rounded-3xl">
            <Target className="w-10 h-10 text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-gray-400 leading-relaxed">
              Cerrar la brecha entre la teoría académica y las habilidades reales que demandan las empresas tecnológicas. Creemos que la mejor forma de aprender a programar es construyendo.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass p-10 rounded-3xl">
            <Users className="w-10 h-10 text-secondary mb-6" />
            <h2 className="text-2xl font-bold mb-4">Comunidad Primero</h2>
            <p className="text-gray-400 leading-relaxed">
              No solo vendemos cursos; construimos una comunidad. Nuestros estudiantes, profesores y mentores colaboran constantemente para resolver problemas y mejorar juntos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Highlight */}
      <section className="bg-surface border-y border-surface-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 text-center md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-extrabold text-white mb-2">+1000</div>
              <div className="text-gray-500">Horas de Código</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">100%</div>
              <div className="text-gray-500">Enfoque Práctico</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-secondary mb-2">24/7</div>
              <div className="text-gray-500">Acceso a la Comunidad</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
