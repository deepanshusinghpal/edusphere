import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ 
    icon, 
    title, 
    description, 
    iconBg, 
    iconColor, 
    isActionCard, 
    link 
}) => {
    
    // Determine the link destination
    const destination = isActionCard ? (link || '/courses') : `/courses?subject=${encodeURIComponent(title)}`;
    
    // --- Styles for the "Explore All" action card ---
    if (isActionCard) {
        return (
            <Link 
                to={destination}
                className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out group hover:shadow-2xl hover:-translate-y-1 border-2 border-gray-300 border-dashed h-full flex flex-col items-center justify-center text-center hover:border-brand hover:bg-brand-superlight"
            >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand/20">
                    <div className="text-gray-500 group-hover:text-brand transition-colors">
                        {icon}
                    </div>
                </div>
                <h3 className="text-xl font-bold text-edx-gray-dark mb-2 group-hover:text-brand transition-colors">{title}</h3>
                <p className="text-edx-gray text-sm">{description}</p>
            </Link>
        );
    }

    // --- Styles for all other standard category cards ---
    return (
        <Link 
            to={destination}
            className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out group hover:shadow-2xl hover:-translate-y-1 hover:shadow-brand/20 border-2 border-transparent hover:border-brand h-full flex flex-col items-center text-center"
        >
            {/* Colored icon circle */}
            <div className={`w-16 h-16 rounded-full ${iconBg || 'bg-gray-100'} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}>
                <div className={`${iconColor || 'text-brand'}`}>
                    {icon}
                </div>
            </div>
            <h3 className="text-xl font-bold text-edx-gray-dark mb-2">{title}</h3>
            <p className="text-edx-gray text-sm">{description}</p>
        </Link>
    );
};

export default CategoryCard;

