import React from 'react';
import { Link } from 'react-router-dom';
// The Star and PlayCircle icons are no longer needed and have been removed.

const CourseCard = ({ course }) => (
  // Main card container with enhanced shadow, border, and hover effects
  <Link 
    to={`/courses/${course.id}`} 
    className="bg-white rounded-xl shadow-lg flex flex-col h-full transition-all duration-300 ease-in-out group hover:shadow-2xl hover:shadow-brand/20 hover:-translate-y-2"
  >
    {/* Image container with a subtle overlay effect */}
    <div className="overflow-hidden relative">
      <img 
        src={course.thumbnail} 
        alt={course.title} 
        className="w-full h-44 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
      />
      {/* Darkening overlay that appears on hover */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
      
      {/* Course level badge */}
      <span className="absolute top-3 right-3 bg-white text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
        {course.level || 'All Levels'}
      </span>
    </div>

    {/* Content section restored to original dark color scheme */}
    <div className="p-4 flex flex-col flex-grow bg-brand text-white">
      {/* Title section - grows to push footer down */}
      <div className="flex-grow">
        <h3 className="font-bold text-white transition-colors duration-300 text-base leading-snug line-clamp-2" style={{ minHeight: '2.5rem' }}>
          {course.title}
        </h3>
      </div>
      
      {/* Footer section with instructor and rating info */}
      <div className="mt-auto pt-4 border-t border-brand-dark">
        <p className="text-sm font-semibold text-gray-400">
          By {course.instructor.name}
        </p>
        
        {/* The review section has been removed as requested */}
      </div>
    </div>
  </Link>
);

export default CourseCard;

