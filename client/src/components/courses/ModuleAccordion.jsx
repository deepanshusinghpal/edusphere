import React, { useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

const ModuleAccordion = ({ title, topics }) => {
  const [isOpen, setIsOpen] = useState(true); // Default to open

  return (
    <div className="border border-gray-200 rounded-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-edx-gray-light hover:bg-gray-200 transition-colors text-left"
      >
        <h3 className="font-bold text-edx-gray-dark">{title}</h3>
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <ul className="divide-y divide-gray-200">
          {topics.map((topic, index) => (
            <li key={index} className="p-4 flex items-center">
              <BookOpen size={18} className="mr-3 text-edx-gray" />
              <span className="text-edx-gray">{topic}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModuleAccordion;

