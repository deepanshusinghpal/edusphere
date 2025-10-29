import React, { useState, useEffect } from 'react';
// NOTE: Redux hooks and imports are temporarily commented out to resolve 
// dependency errors in this sandboxed environment. Your Redux logic is preserved.
// You can uncomment these lines when you place the code back in your project.
// import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, ChevronDown, BookOpen, ArrowRight } from 'lucide-react';
// import { logout, reset } from '../../store/slices/authSlice';
// import { fetchCategories } from '../../store/slices/categorySlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigate = useNavigate();
  // const dispatch = useDispatch(); // Temporarily removed

  // --- Mock Data & Local State (to replace Redux) ---
  // To view guest links, set the initial state to `useState(null)`
  const [user, setUser] = useState({ name: 'Jane Doe' }); 
  const [categories] = useState([
      { id: 1, name: 'Web Development' },
      { id: 2, name: 'Data Science & ML' },
      { id: 3, name: 'Mobile Development' },
      { id: 4, name: 'UI/UX Design' },
      { id: 5, name: 'Digital Marketing' },
      { id: 6, name: 'Business & Finance' },
      { id: 7, name: 'Cybersecurity' },
      { id: 8, name: 'Cloud & DevOps' }
  ]);
  // const { user } = useSelector((state) => state.auth); // Replaced with local state
  // const { categories } = useSelector((state) => state.categories); // Replaced with local state

  // This useEffect is no longer needed with mock data
  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [dispatch]);

  // Effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    // dispatch(logout()); // Restore in your project
    // dispatch(reset()); // Restore in your project
    setUser(null); // Simulate logout
    setIsMenuOpen(false);
    navigate('/');
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
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
    <header className={`bg-brand-dark sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-2xl bg-opacity-95 backdrop-blur-sm border-b border-brand' : 'border-b border-transparent'}`}>
      <nav className="container mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-3xl font-extrabold text-white tracking-tight transition-transform duration-300 hover:scale-105">
            edusphere
          </Link>
          <div className="hidden lg:flex items-center relative group">
            <button className="flex items-center text-sm font-semibold text-gray-300 hover:text-white transition-colors">
              <span>Courses</span>
              <ChevronDown className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[34rem] bg-white rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 -translate-y-4 transition-all duration-300 ease-in-out invisible group-hover:visible z-10 overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-bold text-ui-headings mb-4 px-2">Explore Our Top Categories</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {categories.slice(0, 8).map((category, index) => (
                    <Link 
                      key={category.id} 
                      to={`/courses?subject=${encodeURIComponent(category.name)}`}
                      className="group/item flex items-center p-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 hover:text-brand transition-all duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <BookOpen size={16} className="mr-3 text-gray-400 group-hover/item:text-brand transition-colors" />
                      <span className="transform group-hover/item:translate-x-1 transition-transform duration-300">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
                  <Link to="/courses" className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors duration-200 group/link flex items-center justify-center">
                    View All Courses <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-grow max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative w-full group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-gray-500 transition-colors group-focus-within:text-brand" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What do you want to learn?"
              className="w-full pl-12 pr-4 py-2.5 border bg-brand border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-light transition-all duration-300 shadow-inner"
            />
          </form>
        </div>
        <div className="hidden lg:flex items-center">
          {user ? authLinks : guestLinks}
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white z-[60] relative" aria-label="Open menu">
              <span className={`transition-transform duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMenuOpen ? 'rotate-45' : 'rotate-0'}`}><Menu size={24} /></span>
              <span className={`transition-transform duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMenuOpen ? 'rotate-0' : '-rotate-45'}`}><X size={24} /></span>
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-brand-dark pt-20 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
        <div className="flex flex-col space-y-2 p-6">
            <form onSubmit={handleSearch} className={`relative w-full mb-4 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`} style={{ transitionDelay: '200ms' }}>
              <span className="absolute inset-y-0 left-0 flex items-center pl-4"><Search className="h-5 w-5 text-gray-500" /></span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="What do you want to learn?" 
                className="w-full pl-12 pr-4 py-2.5 border rounded-lg bg-brand border-gray-600 text-white" />
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

