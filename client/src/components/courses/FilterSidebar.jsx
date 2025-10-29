import React from 'react';
import { X } from 'lucide-react';

const FilterSection = ({ title, options, selected, onChange }) => (
    <div className="py-6 border-b border-gray-200">
        <h3 className="font-bold text-edx-gray-dark mb-4">{title}</h3>
        <div className="space-y-3">
            {options.map(option => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded-sm border-gray-300 text-brand focus:ring-brand focus:ring-offset-0"
                        checked={selected.includes(option)}
                        onChange={() => onChange(title, option)}
                    />
                    <span className="text-edx-gray-dark group-hover:text-brand transition-colors">{option}</span>
                </label>
            ))}
        </div>
    </div>
);

const FilterSidebar = ({ isOpen, onClose, selectedFilters, onFilterChange, onClearFilters }) => {
  const filters = {
    "Subject": ["Computer Science", "Programming", "Data Science", "Web Development", "Cloud & DevOps", "Cybersecurity", "Artificial Intelligence"],
    "Level": ["Beginner", "Intermediate", "Advanced"],
  };

  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  return (
    // --- THIS IS THE CRITICAL FIX: z-40 is lower than the Navbar's z-50 ---
    <aside className={`fixed top-0 left-0 h-full bg-white z-40 w-80 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:w-1/4 lg:max-w-xs lg:shadow-none lg:border-r lg:bg-transparent`}>
      <div className="p-6 pt-24 lg:pt-6"> {/* Add top padding on mobile to clear the sticky navbar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-edx-gray-dark">Filter by</h2>
          {hasActiveFilters && (
            <button onClick={onClearFilters} className="text-sm font-semibold text-brand hover:text-brand-dark">
              Clear All
            </button>
          )}
          <button onClick={onClose} className="lg:hidden text-edx-gray hover:text-edx-gray-dark">
            <X />
          </button>
        </div>
        <div className="mt-4 lg:mt-0">
          {Object.entries(filters).map(([title, options]) => (
            <FilterSection 
              key={title} 
              title={title} 
              options={options}
              selected={selectedFilters[title] || []}
              onChange={onFilterChange}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;

