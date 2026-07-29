export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Sobre Código Libre</h1>
      <div className="prose max-w-none text-gray-600 space-y-4">
        <p className="text-lg">
          Código Libre es una academia de tecnología comprometida con la formación práctica y de calidad. 
          Llevamos más de 10 años preparando profesionales para el mundo real.
        </p>
        <p>
          Nuestros instructores son profesionales activos en la industria, lo que garantiza que el conocimiento 
          que transmitimos es relevante, actualizado y aplicable desde el primer día.
        </p>
        <p>
          Ofrecemos cursos en Linux, Java, SQL/PL-SQL, Oracle DBA, PHP, administración de servidores y más. 
          Cada programa está diseñado para llevarte desde los fundamentos hasta un nivel profesional.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "🎯", title: "Enfoque práctico", desc: "Aprendes haciendo, no solo leyendo." },
          { icon: "👨‍🏫", title: "Instructores expertos", desc: "Profesionales activos en la industria." },
          { icon: "🌐", title: "Comunidad activa", desc: "Red de egresados que se apoyan mutuamente." },
        ].map((item) => (
          <div key={item.title} className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
