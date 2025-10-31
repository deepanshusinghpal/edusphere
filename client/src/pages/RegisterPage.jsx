import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// --- FIX: Adding .js/.jsx extensions to imports ---
import { register, reset } from '../store/slices/authSlice.js';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import { Loader2, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

// --- REMOVED SocialIcon component ---

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    if (isError) {
      alert(message);
      dispatch(reset());
    }
    return () => clearTimeout(timer);
  }, [isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, role: 'STUDENT' };
    try {
      const resultAction = await dispatch(register(userData));
      if (register.fulfilled.match(resultAction)) {
        navigate('/dashboard');
      }
    } catch (err) {
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
        <div className={`stagger-child ${isVisible ? 'stagger-child-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          <label htmlFor="name" className="block text-sm font-medium text-edx-gray-dark">Full Name</label>
          <div className="mt-1 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-gray-400" />
            </span>
            <input id="name" name="name" type="text" value={name} onChange={onChange} required className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand shadow-sm" />
          </div>
        </div>
        
        <div className={`stagger-child ${isVisible ? 'stagger-child-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <label htmlFor="email" className="block text-sm font-medium text-edx-gray-dark">Email address</label>
          <div className="mt-1 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </span>
            <input id="email" name="email" type="email" value={email} onChange={onChange} required className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand shadow-sm" />
          </div>
        </div>
        
        <div className={`stagger-child ${isVisible ? 'stagger-child-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
          <label htmlFor="password" className="block text-sm font-medium text-edx-gray-dark">Password</label>
          <div className="mt-1 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-gray-400" />
            </span>
            <input 
              id="password" 
              name="password" 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={onChange} 
              required 
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand shadow-sm" 
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
        
        <div className={`stagger-child ${isVisible ? 'stagger-child-visible' : ''}`} style={{ transitionDelay: '400ms' }}>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark disabled:bg-brand/50 transition-all duration-300 transform hover:-translate-y-0.5">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Create Account'}
          </button>
        </div>
      </form>

      {/* --- REMOVED SOCIAL LOGIN SECTION --- */}
      
    </AuthLayout>
  );
};

export default RegisterPage;

