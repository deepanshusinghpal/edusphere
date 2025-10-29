import React from 'react';
import { Link } from 'react-router-dom';

const ValuePropCard = ({ icon, title, description, linkText, linkTo }) => (
  <div className="text-center">
    <div className="flex items-center justify-center h-16 w-16 mx-auto bg-edx-gray-light rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-edx-gray-dark">{title}</h3>
    <p className="mt-2 text-edx-gray">{description}</p>
    <Link to={linkTo} className="mt-4 inline-block font-semibold text-edx-blue hover:text-edx-blue-dark transition-colors">
      {linkText} &rarr;
    </Link>
  </div>
);

export default ValuePropCard;
