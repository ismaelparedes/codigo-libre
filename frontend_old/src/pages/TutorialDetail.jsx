import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/api";

export default function TutorialDetail() {
  const { slug } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/tutorials/${slug}`).then((r) => setTutorial(r.data)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="flex justify-center py-24"><div className="w-10 h-10 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!tutorial) return <div className="text-center py-24 text-gray-400">Tutorial no encontrado. <Link to="/tutoriales" className="text-accent-500">Volver</Link></div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/tutoriales" className="text-accent-500 text-sm hover:underline mb-6 inline-block">← Volver a tutoriales</Link>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="badge bg-accent-500 text-white">{tutorial.category?.name}</span>
        <span className="text-sm text-gray-400">
          {new Date(tutorial.createdAt).toLocaleDateString("es-DO", { year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{tutorial.title}</h1>
      {tutorial.excerpt && <p className="text-gray-500 text-lg mb-8 border-l-4 border-accent-500 pl-4">{tutorial.excerpt}</p>}

      {tutorial.image && (
        <img src={tutorial.image} alt={tutorial.title} className="w-full rounded-2xl mb-8 object-cover max-h-80" />
      )}

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: tutorial.content }} />
    </div>
  );
}
