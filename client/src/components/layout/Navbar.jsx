import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  User,
  ChevronDown,
  BookOpen,
  ArrowRight,
  BrainCircuit,
  Code,
  BarChart,
  Palette,
  Laptop,
  Cloud,
  ShieldCheck
} from 'lucide-react';
// --- FIX: Using correct relative paths with .js extension ---
import { logout, reset } from '../../store/slices/authSlice.js';
import { fetchCategories } from '../../store/slices/categorySlice.js';
import { fetchCourses } from '../../store/slices/courseSlice.js';

// Define categories with icons, matching the homepage
const categoriesWithIcons = [
  { icon: <Code size={20} className="text-brand" />, name: 'Programming' },
  { icon: <BrainCircuit size={20} className="text-brand" />, name: 'Data Science' },
  { icon: <Laptop size={20} className="text-brand" />, name: 'Artificial Intelligence' },
  { icon: <Palette size={20} className="text-brand" />, name: 'Web Development' },
  { icon: <Cloud size={20} className="text-brand" />, name: 'Cloud & DevOps' },
  { icon: <ShieldCheck size={20} className="text-brand" />, name: 'Cybersecurity' },
  { icon: <BarChart size={20} className="text-brand" />, name: 'Computer Science' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { categories: categoriesFromStore } = useSelector((state) => state.categories);
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    if (!categoriesFromStore || categoriesFromStore.length === 0) {
        dispatch(fetchCategories());
    }
    if (!courses || courses.length === 0) {
        dispatch(fetchCourses());
    }
  }, [dispatch, categoriesFromStore, courses]);

  // Effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effect to lock body scroll when mobile menu or desktop dropdown is open
  useEffect(() => {
    if (isMenuOpen || isDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, isDropdownOpen]);

  // Effect to update search suggestions
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    if (courses.length > 0) {
      const matchingCourses = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(matchingCourses.slice(0, 5)); // Show top 5 matches
    }
  }, [searchTerm, courses]);

  // Effect to close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setIsMenuOpen(false);
    navigate('/');
  };
  
  // Updated search submit handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setSuggestions([]);
      setIsSearchFocused(false);
      e.target.querySelector('input')?.blur(); // Blur input on submit
    }
  };
  
  // Handler for clicking a suggestion
  const handleSuggestionClick = (courseId) => {
    navigate(`/courses/${courseId}`);
    setSearchTerm('');
    setSuggestions([]);
    setIsSearchFocused(false);
  };
  
  const authLinks = (
    <div className="flex items-center space-x-6">
      <Link to="/dashboard" className="flex items-center text-sm font-semibold text-gray-300 hover:text-white transition-colors group relative py-2">
        <User size={20} className="mr-2 text-gray-400 group-hover:text-white transition-colors" />
        <span>My Dashboard</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
      </Link>
      <div className="h-6 border-l border-gray-600"></div>
      <button onClick={handleLogout} className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
        Log Out
      </button>
    </div>
  );

  const guestLinks = (
    <div className="flex items-center space-x-6">
      <Link to="/login" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors relative group py-2">
        Sign In
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
      </Link>
      <Link
        to="/register"
        className="bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-brand/40"
      >
        Register
      </Link>
    </div>
  );

  return (
    <header className={`bg-brand-dark sticky top-0 z-[100] transition-all duration-300 ${isScrolled ? 'shadow-2xl border-b border-brand' : 'border-b border-transparent'}`}>
      <nav className="container mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-3xl font-extrabold text-white tracking-tight transition-transform duration-300 hover:scale-105">
            edusphere
          </Link>
          <div 
            className="hidden lg:flex items-center relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center text-sm font-semibold text-gray-300 hover:text-white transition-colors">
              <span>Courses</span>
              <ChevronDown className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            
            <div className="absolute top-full left-0 mt-4 w-72 bg-white rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transform group-hover:translate-y-0 group-focus-within:translate-y-0 -translate-y-4 transition-all duration-300 ease-in-out invisible group-hover:visible group-focus-within:visible z-10 overflow-hidden">
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                <h3 className="text-sm font-bold text-edx-gray-dark mb-3 px-3">Top Categories</h3>
                <div className="grid grid-cols-1 gap-y-1">
                  {categoriesWithIcons.map((category, index) => (
                    <Link 
                      key={category.name} 
                      to={`/courses?subject=${encodeURIComponent(category.name)}`}
                      className="group/item flex items-center p-3 text-sm text-edx-gray rounded-lg hover:bg-gray-100 hover:text-brand transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 -translate-x-4 group-hover:translate-x-0 group-focus-within:translate-x-0"
                      style={{ transitionDelay: `${index * 50}ms` }}
                      onClick={(e) => {
                        e.currentTarget.closest('.group')?.blur();
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="mr-4">{category.icon}</div>
                      <span className="font-semibold text-edx-gray-dark group-hover/item:text-brand transition-colors">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
                  <Link 
                    to="/courses" 
                    className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors duration-200 group/link flex items-center justify-center"
                    onClick={(e) => {
                      e.currentTarget.closest('.group')?.blur();
                      setIsDropdownOpen(false);
                    }}
                  >
                    View All Courses <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* --- SEARCH BAR WITH SUGGESTIONS (FIXED) --- */}
        <div className="hidden md:flex flex-grow max-w-md mx-8" ref={searchContainerRef}>
          <form onSubmit={handleSearch} className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 z-10">
              <Search className="h-5 w-5 text-gray-500" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="What do you want to learn?"
              // --- FIX: Add rounded-t-lg and remove rounded-b-lg if suggestions are open ---
              className={`relative w-full pl-12 pr-4 py-2.5 border bg-brand border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-brand-light transition-all duration-300 shadow-inner placeholder-gray-400 ${isSearchFocused && suggestions.length > 0 ? 'rounded-t-lg' : 'rounded-lg'}`}
              autoComplete="off"
            />
            {/* --- FIX: Suggestions Dropdown (attached) --- */}
            {isSearchFocused && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg overflow-hidden z-20 border-x border-b border-gray-200">
                <ul className="divide-y divide-gray-100">
                  {suggestions.map(course => (
                    <li key={course.id}>
                      <button
                        type="button" // Important: type=button to prevent form submit
                        onClick={() => handleSuggestionClick(course.id)}
                        className="block w-full text-left px-4 py-3 text-sm text-edx-gray-dark hover:bg-gray-100 transition-colors"
                      >
                        {course.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
        
        <div className="hidden lg:flex items-center">
          {user ? authLinks : guestLinks}
        </div>
        
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white z-[60] relative" aria-label="Open menu">
              <span className={`transition-transform duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMenuOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'}`}><Menu size={24} /></span>
              <span className={`transition-transform duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}><X size={24} /></span>
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <div className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-brand-dark pt-20 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
        <div className="flex flex-col space-y-2 p-6">
            <form onSubmit={handleSearch} className={`relative w-full mb-4 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`} style={{ transitionDelay: '200ms' }}>
              <span className="absolute inset-y-0 left-0 flex items-center pl-4"><Search className="h-5 w-5 text-gray-500" /></span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="What do you want to learn?" 
                className="w-full pl-12 pr-4 py-2.5 border rounded-lg bg-brand border-gray-600 text-white placeholder-gray-400" />
            </form>
            <div className="border-t border-gray-700 my-4"></div>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className={`flex items-center font-semibold text-gray-300 hover:text-white py-3 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`} style={{ transitionDelay: '300ms' }}>
                    <User size={20} className="mr-3" /> My Dashboard
                </Link>
                <button onClick={handleLogout} className={`text-left font-semibold text-gray-300 hover:text-white py-3 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`} style={{ transitionDelay: '350ms' }}>Log Out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className={`font-semibold text-gray-300 hover:text-white py-3 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`} style={{ transitionDelay: '300ms' }}>Sign In</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className={`mt-2 block bg-brand text-white text-center font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`} style={{ transitionDelay: '350ms' }}>Register</Link>
              </>
            )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

