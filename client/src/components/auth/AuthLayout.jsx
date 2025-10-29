import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ title, subtitle, subtitleLink, subtitleLinkText, children }) => {
  return (
    <div className="bg-edx-gray-light min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-edx-gray-dark">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-edx-gray">
          {subtitle}{' '}
          <Link to={subtitleLink} className="font-semibold text-brand hover:text-brand-dark">
            {subtitleLinkText}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-200 rounded-sm sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
