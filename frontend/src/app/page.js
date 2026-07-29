"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Database, Laptop, Zap } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Aprende a programar <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                sin límites
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Únete a Código Libre. Construye proyectos reales, domina el ecosistema web moderno y acelera tu carrera como desarrollador de software.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cursos"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2 group"
              >
                Explorar Premium
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/cursos-pregrabados"
                className="glass hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center"
              >
                Cursos Pregrabados
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface/50 border-t border-surface-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Código Libre?</h2>
            <p className="text-gray-400">Metodología práctica enfocada en lo que el mercado laboral exige.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="bg-primary/20 p-3 rounded-lg w-fit mb-6">
                <Laptop className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Práctico</h3>
              <p className="text-gray-400">Menos teoría aburrida y más código. Construye aplicaciones reales desde el primer día.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="bg-secondary/20 p-3 rounded-lg w-fit mb-6">
                <Code2 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Stack Moderno</h3>
              <p className="text-gray-400">Aprende React, Next.js, Node.js y las herramientas que usan las mejores empresas.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-6">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">A tu ritmo</h3>
              <p className="text-gray-400">Accede a clases en vivo o consume nuestro catálogo de cursos pregrabados más económicos.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">¿Listo para escribir tu primera línea?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Regístrate hoy y accede a nuestra comunidad exclusiva de desarrolladores.
          </p>
          <Link
            href="https://project-qncn9.vercel.app/login"
            className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors inline-block"
          >
            Comenzar Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
