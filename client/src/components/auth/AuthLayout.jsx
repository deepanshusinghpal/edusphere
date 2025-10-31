import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const AuthLayout = ({ title, subtitle, subtitleLink, subtitleLinkText, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  return (
    // Main container to center the card on a light gray background
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* The main card that fades/scales in */}
      <div 
        className={`w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-12 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Branding section at the top of the card */}
        <div className="text-center mb-8">
          <Link to="/" className="flex justify-center items-center text-3xl font-extrabold text-brand-dark mb-4 transition-transform duration-300 hover:scale-105">
            <BookOpen className="w-8 h-8 mr-2" />
            edusphere
          </Link>
          <h2 className="text-2xl font-extrabold text-edx-gray-dark">
            {title}
          </h2>
          <p className="mt-2 text-sm text-edx-gray">
            {subtitle}{' '}
            <Link to={subtitleLink} className="font-semibold text-brand hover:text-brand-dark hover:underline">
              {subtitleLinkText}
            </Link>
          </p>
        </div>

        {/* The form (Login or Register) goes here */}
        <div>
          {children}
        </div>
      </div>
      
      {/* Global styles for staggered animation (same as homepage) */}
      <style jsx global>{`
        .stagger-child {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .stagger-child-visible {
            opacity: 1;
            transform: translateY(0);
        }
        /* Grid animation for hero (not used here, but safe to keep) */
        @keyframes grid-pulse {
            0%, 100% { opacity: 0.05; }
            50% { opacity: 0.1; }
        }
        .animate-grid-pulse {
            animation: grid-pulse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;

