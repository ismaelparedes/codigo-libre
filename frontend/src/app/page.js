"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Database, Terminal, Server, Shield } from "lucide-react";

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
              Especialistas en <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Linux y Bases de Datos
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Bienvenido a Código Libre Dominicano. Fórmate como experto en Administración de Sistemas Operativos, Bases de Datos, Redes y Tecnologías Open Source.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cursos"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2 group"
              >
                Explorar Cursos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/nosotros"
                className="glass hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center"
              >
                Sobre Nosotros y Becas
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
            <p className="text-gray-400">Instructores calificados, aulas virtuales y las tecnologías que mueven el mundo corporativo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="bg-primary/20 p-3 rounded-lg w-fit mb-6">
                <Terminal className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Linux & SO</h3>
              <p className="text-gray-400">Domina la administración de sistemas operativos basados en GNU/Linux y Unix, el estándar de los servidores mundiales.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="bg-secondary/20 p-3 rounded-lg w-fit mb-6">
                <Database className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bases de Datos</h3>
              <p className="text-gray-400">Conviértete en un DBA experto. Especialízate en motores de bases de datos robustos y administración de datos a gran escala.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-6">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Infraestructura</h3>
              <p className="text-gray-400">Arquitectura de redes, ciberseguridad y servicios Open Source para mantener la infraestructura empresarial segura.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Únete a más de 5,500 estudiantes</h2>
          <p className="text-xl text-gray-400 mb-10">
            Descubre nuestro programa de becas y empieza tu carrera tecnológica con los mejores profesionales.
          </p>
          <Link
            href="https://project-qncn9.vercel.app/login"
            className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors inline-block"
          >
            Solicita tu Beca
          </Link>
        </div>
      </section>
    </div>
  );
}
