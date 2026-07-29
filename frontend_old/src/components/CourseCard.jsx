import { Link } from "react-router-dom";

const levelLabel = { BEGINNER: "Principiante", INTERMEDIATE: "Intermedio", ADVANCED: "Avanzado" };
const levelColor = { BEGINNER: "bg-green-100 text-green-700", INTERMEDIATE: "bg-yellow-100 text-yellow-700", ADVANCED: "bg-red-100 text-red-700" };

export default function CourseCard({ course }) {
  return (
    <Link to={`/cursos/${course.slug}`} className="card group block">
      <div className="h-44 bg-gradient-to-br from-primary-500 to-accent-500 relative overflow-hidden">
        {course.image ? (
          <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-5xl font-extrabold text-white opacity-30">{"</>"}</span>
          </div>
        )}
        <span className={`badge absolute top-3 left-3 ${levelColor[course.level] || "bg-gray-100 text-gray-700"}`}>
          {levelLabel[course.level] || course.level}
        </span>
      </div>
      <div className="p-5">
        <span className="text-xs text-primary-500 font-semibold uppercase tracking-wide">
          {course.category?.name}
        </span>
        <h3 className="font-bold text-gray-900 mt-1 mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{course.description}</p>
        <div className="flex items-center justify-between">
          {course.duration && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {course.duration}
            </span>
          )}
          <span className="font-bold text-primary-500">
            {course.isFree ? "Gratis" : `$${course.price}`}
          </span>
        </div>
      </div>
    </Link>
  );
}
