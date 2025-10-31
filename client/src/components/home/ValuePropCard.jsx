import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ValuePropCard = ({ icon, title, description, linkText, linkTo }) => (
    <div className="bg-white p-8 rounded-lg shadow-xl text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col group">
        <div className="inline-block bg-brand/10 p-4 rounded-full mb-6 mx-auto transition-all duration-300 group-hover:bg-brand/20 group-hover:scale-110">{icon}</div>
        <h3 className="text-2xl font-bold text-edx-gray-dark mb-4">{title}</h3>
        <p className="text-edx-gray mb-6 flex-grow">{description}</p>
        <Link to={linkTo} className="font-semibold text-brand hover:underline group/link flex items-center justify-center mt-auto">
            {linkText} <ArrowRight size={18} className="ml-2 transition-transform duration-300 transform group-hover/link:translate-x-1" />
        </Link>
    </div>
);

export default ValuePropCard;

