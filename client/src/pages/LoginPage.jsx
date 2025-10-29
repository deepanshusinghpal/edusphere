import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../store/slices/authSlice';
import AuthLayout from '../components/auth/AuthLayout';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  // This useEffect now ONLY handles showing error messages.
  useEffect(() => {
    if (isError) {
      alert(message);
      dispatch(reset()); // Reset the state ONLY if there is an error.
    }
  }, [isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    
    try {
      const resultAction = await dispatch(login(userData));
      
      if (login.fulfilled.match(resultAction)) {
        const user = resultAction.payload.user;
        
        // This role-based redirection is correct.
        if (user.role === 'INSTRUCTOR') {
          navigate('/instructor/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      // Errors are handled by the useEffect, so we just log here.
      console.error('Failed to log in:', err);
    }
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Or"
      subtitleLink="/register"
      subtitleLinkText="create a new account"
    >
      <form className="space-y-6" onSubmit={onSubmit}>
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
        {isError && <p className="text-red-500 text-sm">{message}</p>}
        <div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-sm font-semibold text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark disabled:bg-brand/50">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

