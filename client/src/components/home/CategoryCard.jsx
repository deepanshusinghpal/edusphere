import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ icon, title, description }) => (
  <Link to="#" className="bg-white p-6 rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300 flex items-start space-x-4 group">
    <div className="text-edx-blue group-hover:text-edx-blue-dark transition-colors duration-300">{icon}</div>
    <div>
      <h3 className="font-bold text-edx-gray-dark group-hover:text-edx-blue-dark transition-colors duration-300">{title}</h3>
      <p className="text-sm text-edx-gray mt-1">{description}</p>
    </div>
  </Link>
);

export default CategoryCard;
