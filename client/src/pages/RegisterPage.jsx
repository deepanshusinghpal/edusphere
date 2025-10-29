import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../store/slices/authSlice';
import AuthLayout from '../components/auth/AuthLayout';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  // This useEffect now only handles showing error messages
  useEffect(() => {
    if (isError) {
      alert(message);
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  // --- THIS IS THE CRITICAL CHANGE: IMPERATIVE NAVIGATION ---
  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, role: 'STUDENT' };
    
    try {
      // We dispatch the action and wait for it to complete
      const resultAction = await dispatch(register(userData));
      // unwrap() will throw an error if the action was rejected
      if (register.fulfilled.match(resultAction)) {
        // Only navigate AFTER a successful registration
        navigate('/dashboard');
      }
    } catch (err) {
      // The error is already handled by the useEffect, but this prevents unhandled promise rejections
      console.error('Failed to register:', err);
    }
  };

  return (
    <AuthLayout
      title="Create a new account"
      subtitle="Or"
      subtitleLink="/login"
      subtitleLinkText="sign in to your existing account"
    >
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-edx-gray-dark">Full Name</label>
          <div className="mt-1">
            <input id="name" name="name" type="text" value={name} onChange={onChange} required className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-edx-gray-dark">Email address</label>
          <div className="mt-1">
            <input id="email" name="email" type="email" value={email} onChange={onChange} required className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand" />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-edx-gray-dark">Password</label>
          <div className="mt-1 relative">
            <input 
              id="password" 
              name="password" 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={onChange} 
              required 
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand" 
            />
            <button 
              type="button" 
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
        </div>
        <div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-sm font-semibold text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark disabled:bg-brand/50">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Create Account'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;

