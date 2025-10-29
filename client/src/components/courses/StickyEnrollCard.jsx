import React from 'react';
import { ExternalLink, Clock, BarChart2 } from 'lucide-react';

const StickyEnrollCard = ({ course, onEnroll, isProcessing }) => {
  const buttonText = 'Start Now';
  
  return (
    <div className="border border-gray-200 rounded-sm shadow-lg sticky top-24">
      <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover rounded-t-sm" />
      <div className="p-6">
        <div className="mb-4">
            <span className="text-4xl font-extrabold text-edx-gray-dark">
                Free
            </span>
            {course.link && <span className="ml-2 text-edx-green font-semibold">(Free for You)</span>}
        </div>
        <button
          onClick={onEnroll}
          disabled={isProcessing}
          className="w-full bg-brand text-white font-bold py-3 rounded-sm hover:bg-brand-dark transition duration-300 disabled:bg-brand/50 flex items-center justify-center"
        >
          {isProcessing ? 'Processing...' : buttonText}
          <ExternalLink size={16} className="ml-2" />
        </button>
        <div className="mt-6 space-y-3 text-edx-gray">
          <p className="flex items-center"><Clock size={16} className="mr-3" /> {course.duration || 'Self-paced'}</p>
          <p className="flex items-center"><BarChart2 size={16} className="mr-3" /> {course.level.charAt(0) + course.level.slice(1).toLowerCase()} Level</p>
        </div>
      </div>
    </div>
  );
};

export default StickyEnrollCard;

