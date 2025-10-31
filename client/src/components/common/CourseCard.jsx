import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    // Helper to format the level text
    const formatLevel = (level) => {
        if (!level) return 'All Levels';
        return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
    };

    return (
        <Link
            to={`/courses/${course.id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 group border border-gray-200 hover:shadow-brand/20 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col"
        >
            <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden relative">
                <img
                    src={course.thumbnail}
                    alt={`Thumbnail for ${course.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    // Fallback placeholder image
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x400/e2e8f0/a0aec0?text=${encodeURIComponent(course.title.split(' ').slice(0,3).join(' '))}`;
                    }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                <span className="absolute top-3 right-3 text-xs font-semibold bg-white text-brand-dark px-2.5 py-1 rounded-full shadow-md z-10">
                    {formatLevel(course.level)}
                </span>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-base font-bold text-edx-gray-dark mb-2 group-hover:text-brand transition-colors flex-grow line-clamp-2" style={{ minHeight: '2.5rem' }}>
                    {course.title}
                </h3>
                <p className="text-sm text-edx-gray mb-4">
                    {course.instructor.name}
                </p>
                <div className="mt-auto">
                    <div
                        className="w-full text-center block bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 transform group-hover:scale-105 group-hover:bg-brand-dark shadow-md group-hover:shadow-lg group-hover:shadow-brand/30"
                    >
                        View Details
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;

