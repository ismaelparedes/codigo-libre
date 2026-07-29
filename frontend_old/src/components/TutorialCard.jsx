import { Link } from "react-router-dom";

export default function TutorialCard({ tutorial }) {
  return (
    <Link to={`/tutoriales/${tutorial.slug}`} className="card group block">
      <div className="h-40 bg-gradient-to-br from-accent-500 to-primary-500 overflow-hidden">
        {tutorial.image ? (
          <img src={tutorial.image} alt={tutorial.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl font-extrabold text-white opacity-30">{"{ }"}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <span className="text-xs text-accent-500 font-semibold uppercase tracking-wide">
          {tutorial.category?.name}
        </span>
        <h3 className="font-bold text-gray-900 mt-1 mb-2 group-hover:text-accent-500 transition-colors line-clamp-2">
          {tutorial.title}
        </h3>
        {tutorial.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-3">{tutorial.excerpt}</p>
        )}
        <div className="mt-4 text-xs text-gray-400">
          {new Date(tutorial.createdAt).toLocaleDateString("es-DO", { year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>
    </Link>
  );
}
