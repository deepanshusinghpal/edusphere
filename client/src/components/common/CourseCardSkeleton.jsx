import React from 'react';

const CourseCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-full">
        <div className="h-40 bg-gray-200 animate-pulse"></div>
        <div className="p-5">
            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-5"></div>
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse mt-4"></div>
        </div>
    </div>
);

export default CourseCardSkeleton;

