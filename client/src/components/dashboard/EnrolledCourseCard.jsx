import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const CourseCard = ({ course }) => (
  <Link to={`/courses/${course.id}`} className="bg-white border border-gray-200 rounded-sm flex flex-col h-full hover:shadow-xl transition-shadow duration-300 group">
    <div className="overflow-hidden">
      <img 
        src={course.thumbnail} 
        alt={course.title} 
        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" 
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      {/* This div now contains the title and instructor name and will grow */}
      <div className="flex-grow">
        <h3 className="font-bold text-ui-headings group-hover:text-brand-light transition-colors duration-300 text-base leading-snug line-clamp-2 mb-2">
          {course.title}
        </h3>
        <p className="text-sm font-medium text-ui-text">
          {course.instructor.name}
        </p>
      </div>
      
      {/* This 'footer' div contains the rating and is pushed to the bottom */}
      <div className="mt-auto pt-2">
        {course.reviewCount > 0 ? (
          <div className="flex items-center text-sm text-ui-text border-t border-gray-100 pt-2">
            <span className="font-bold text-ui-headings mr-1">{course.avgRating.toFixed(1)}</span>
            <Star size={16} className="text-accent-yellow fill-current" />
            <span className="ml-2 text-gray-500">({course.reviewCount.toLocaleString()} reviews)</span>
          </div>
        ) : (
          // Render a placeholder to maintain consistent card height, with a transparent border
          <div className="h-5 border-t border-transparent pt-2"></div> 
        )}
      </div>
    </div>
  </Link>
);

export default CourseCard;

