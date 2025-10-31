import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  BrainCircuit,
  Code,
  BarChart,
  Palette,
  GraduationCap,
  Laptop,
  Building,
  Loader2,
  Cloud,
  ShieldCheck,
  ArrowRight,
  Quote,
  Grid3x3
} from 'lucide-react';
// --- FIX: Removing .js/.jsx extensions from imports ---
import { fetchCourses, reset as resetCourses } from '../store/slices/courseSlice';
import { fetchContent } from '../store/slices/contentSlice';

// Import components
import CourseCard from '../components/common/CourseCard';
import CategoryCard from '../components/home/CategoryCard';
import ValuePropCard from '../components/home/ValuePropCard';
import CourseCardSkeleton from '../components/common/CourseCardSkeleton';

// Custom hook for observing elements
const useIntersectionObserver = (options) => {
    const [elements, setElements] = useState([]);
    const [entries, setEntries] = useState([]);
    const observer = useRef(null);

    useEffect(() => {
        if (elements.length > 0) {
            observer.current = new IntersectionObserver((observedEntries) => {
                setEntries(observedEntries);
            }, options);

            elements.forEach(element => {
                if (element) observer.current.observe(element);
            });

            return () => {
                if(observer.current) {
                    elements.forEach(element => {
                        if (element) observer.current.unobserve(element);
                    });
                }
            };
        }
    }, [elements, options]);

    return [observer.current, setElements, entries];
};


const AnimatedSection = ({ children, className }) => {
    const [containerRef, setContainerRef] = useState(null);
    const [observer, setElements, entries] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        if (containerRef) {
            setElements([containerRef]);
        }
    }, [containerRef, setElements]);

    const isVisible = entries.some(entry => entry.isIntersecting);
    
    return (
        <section ref={setContainerRef} className={`${className} animated-section ${isVisible ? 'is-visible' : ''}`}>
            {children}
        </section>
    );
};


const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { courses, status: courseStatus, error: courseError } = useSelector((state) => state.courses);
  const { content, status: contentStatus } = useSelector((state) => state.content);
  
  const [heroSearchTerm, setHeroSearchTerm] = useState('');
  
  const [heroSuggestions, setHeroSuggestions] = useState([]);
  const [isHeroSearchFocused, setIsHeroSearchFocused] = useState(false);
  const heroSearchContainerRef = useRef(null);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchContent());
    return () => { dispatch(resetCourses()); };
  }, [dispatch]);

  // Effect to update hero search suggestions
  useEffect(() => {
    if (heroSearchTerm.trim() === '') {
      setHeroSuggestions([]);
      return;
    }
    
    if (courses.length > 0) {
      const matchingCourses = courses.filter(course => 
        course.title.toLowerCase().includes(heroSearchTerm.toLowerCase())
      );
      setHeroSuggestions(matchingCourses.slice(0, 5)); // Show top 5 matches
    }
  }, [heroSearchTerm, courses]);

  // Effect to close hero suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (heroSearchContainerRef.current && !heroSearchContainerRef.current.contains(event.target)) {
        setIsHeroSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Updated hero search submit handler
  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearchTerm.trim()) {
      navigate(`/courses?search=${encodeURIComponent(heroSearchTerm.trim())}`);
      setHeroSearchTerm('');
      setHeroSuggestions([]);
      setIsHeroSearchFocused(false);
      e.target.querySelector('input')?.blur(); // Blur input on submit
    }
  };

  // Handler for clicking a hero suggestion
  const handleHeroSuggestionClick = (courseId) => {
    navigate(`/courses/${courseId}`);
    setHeroSearchTerm('');
    setHeroSuggestions([]);
    setIsHeroSearchFocused(false);
  };

  const categories = [
    { icon: <Code size={32} />, title: 'Programming', description: 'C, Python, Java, & more', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { icon: <BrainCircuit size={32} />, title: 'Data Science', description: 'Machine Learning & Big Data', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    { icon: <Laptop size={32} />, title: 'Artificial Intelligence', description: 'Deep Learning & NLP', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { icon: <Palette size={32} />, title: 'Web Development', description: 'React, Node.js, & PERN', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
    { icon: <Cloud size={32} />, title: 'Cloud & DevOps', description: 'AWS, Docker, & Kubernetes', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
    { icon: <ShieldCheck size={32} />, title: 'Cybersecurity', description: 'Ethical Hacking & Security', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
    { icon: <BarChart size={32} />, title: 'Computer Science', description: 'DBMS, OS, & Networks', iconBg: 'bg-pink-100', iconColor: 'text-pink-600' },
    { 
      icon: <Grid3x3 size={32} />, 
      title: 'Explore All', 
      description: 'See our full catalog of courses.', 
      isActionCard: true,
      link: '/courses'
    },
  ];

  const valueProps = [
    {
      icon: <GraduationCap size={32} className="text-brand" />,
      title: "Expert-Led Courses",
      description: "Access thousands of courses taught by industry professionals and top university instructors to gain real-world skills.",
      linkText: "Explore Courses",
      linkTo: "/courses"
    },
    {
      icon: <Laptop size={32} className="text-brand" />,
      title: "Flexible & Affordable Learning",
      description: "Learn at your own pace with a wide range of free courses, tutorials, and flexible learning paths that fit your budget.",
      linkText: "Find Your Course",
      linkTo: "/courses"
    },
    {
      icon: <Building size={32} className="text-brand" />,
      title: "Build Your Portfolio",
      description: "Apply what you learn with hands-on projects and real-world examples to build a strong portfolio and get ready for your career.",
      linkText: "Start Building",
      linkTo: "/courses"
    }
  ];

  const testimonials = [
    {
      quote: "This platform transformed my understanding of web development. The hands-on projects were incredibly valuable for my portfolio.",
      name: "Deep",
      course: "The Complete Full-Stack Bootcamp",
      avatar: "https://placehold.co/100x100/a3e635/4d7c0f?text=D"
    },
    {
      quote: "I never thought I could grasp Data Science concepts so quickly. The instructor's explanations were clear, concise, and engaging.",
      name: "Deepak",
      course: "Data Structures and Algorithms",
      avatar: "https://placehold.co/100x100/7dd3fc/0c4a6e?text=D"
    },
     {
      quote: "The Python course was the perfect starting point for my programming journey. I feel confident and ready to tackle more advanced topics.",
      name: "Deepanshu",
      course: "Python for Beginners",
      avatar: "https://placehold.co/100x100/f9a8d4/831843?text=D"
    }
  ];

  const renderFeaturedCourses = () => {
    if (courseStatus === 'loading' || (courseStatus === 'idle' && courses.length === 0)) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => <CourseCardSkeleton key={index} />)}
        </div>
      );
    }
    if (courseStatus === 'failed') {
      return <p className="text-center text-red-500">Could not load courses. {courseError}</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.slice(0, 4).map((course, index) => (
           <div key={course.id} className="stagger-child" style={{transitionDelay: `${200 + index * 100}ms`}}>
             <CourseCard course={course} />
           </div>
        ))}
      </div>
    );
  };

  // Improved loading state
  if ((contentStatus === 'loading' || contentStatus === 'idle') || (courseStatus === 'loading' && courses.length === 0)) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Loader2 className="animate-spin h-16 w-16 text-brand" />
      </div>
    );
  }

  return (
    <div className={`bg-white`}>
      {/* Hero Section */}
      <section className="bg-brand pt-28 pb-32 overflow-hidden relative z-10">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)] animate-grid-pulse"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transition-all duration-1000 ease-out transform opacity-0 translate-y-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto tracking-tight">
              {content.hero_headline || 'Empower Your Tech Journey'}
            </h1>
            <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto" style={{ animationDelay: '200ms' }}>
              {content.hero_subtitle || 'Master Programming, Data Structures & Algorithms, and more.'}
            </p>
          </div>
          {/* --- HERO SEARCH WITH SUGGESTIONS (FIXED) --- */}
          <div className="mt-10 max-w-2xl mx-auto transition-all duration-1000 ease-out transform opacity-0 translate-y-8 animate-fade-in-up" style={{ animationDelay: '400ms' }} ref={heroSearchContainerRef}>
            <form className="relative" onSubmit={handleHeroSearch}>
              <input
                type="text"
                value={heroSearchTerm}
                onChange={(e) => setHeroSearchTerm(e.target.value)}
                onFocus={() => setIsHeroSearchFocused(true)}
                placeholder="What do you want to learn?"
                // --- FIX: Input is always rounded-full ---
                className="w-full pl-6 pr-16 py-4 text-lg border border-gray-600 bg-brand-dark/50 text-white rounded-full shadow-lg group-hover:shadow-brand/20 focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-transparent transition-all duration-300 placeholder-gray-300"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-brand-light text-brand-dark px-6 rounded-full hover:bg-white transition-all duration-300 flex items-center justify-center transform group-hover:scale-105 shadow-lg"
                aria-label="Search"
              >
                <Search size={22} />
              </button>
              
              {/* --- FIX: Suggestions Dropdown (detached and rounded) --- */}
              {isHeroSearchFocused && heroSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-xl overflow-hidden z-20 mt-2">
                  <ul className="divide-y divide-gray-100">
                    {heroSuggestions.map(course => (
                      <li key={course.id}>
                        <button
                          type="button" // Important: type=button to prevent form submit
                          onClick={() => handleHeroSuggestionClick(course.id)}
                          className="block w-full text-left px-6 py-4 text-base text-edx-gray-dark hover:bg-gray-100 transition-colors"
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
        </div>
      </section>
      
      {/* ... (Rest of the page is unchanged) ... */}
      
      {/* Value Props */}
      <AnimatedSection className="py-24 bg-gray-50 relative z-1">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-edx-gray-dark mb-16 stagger-child">
            {content.potential_headline || 'Unlock your potential'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {valueProps.map((prop, index) => 
              <div key={prop.title} className="stagger-child" style={{transitionDelay: `${100 + index * 150}ms`}}>
                  <ValuePropCard {...prop} />
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Courses */}
      <AnimatedSection className="py-24 bg-white relative z-1">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-edx-gray-dark mb-4 stagger-child">
            {content.featured_headline || 'Featured courses'}
          </h2>
          <p className="text-center text-edx-gray mb-16 max-w-2xl mx-auto stagger-child" style={{transitionDelay: '100ms'}}>Discover our most popular courses, curated for excellence and career growth.</p>

          {renderFeaturedCourses()}
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-24 bg-brand-dark relative z-1">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16 stagger-child">
            What Our Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg stagger-child border-t-4 border-brand-light transition-all duration-300 hover:shadow-2xl hover:shadow-brand/20 hover:-translate-y-2" style={{transitionDelay: `${100 + index * 150}ms`}}>
                <Quote className="w-8 h-8 text-brand/30 mb-4" />
                <p className="text-edx-gray mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center mt-auto">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="font-bold text-edx-gray-dark">{testimonial.name}</p>
                    <p className="text-sm text-edx-gray">{testimonial.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Categories */}
      <AnimatedSection className="py-24 bg-gray-50 relative z-1">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-edx-gray-dark mb-16 stagger-child">
            {content.categories_headline || 'Explore top categories'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={category.title} className="stagger-child" style={{transitionDelay: `${100 + index * 100}ms`}}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection className="py-24 bg-white relative z-1">
        <div className="container mx-auto px-6">
            <div className="bg-brand-superlight rounded-2xl p-12 sm:p-16 text-center">
                <h2 className="text-4xl font-bold max-w-3xl mx-auto text-brand-dark stagger-child">
                    {content.cta_headline || 'Take the next step toward your future'}
                </h2>
                <p className="text-edx-gray mt-4 mb-8 max-w-xl mx-auto stagger-child" style={{transitionDelay: '100ms'}}>Join thousands of learners who are unlocking new opportunities. Your journey starts now.</p>
                <Link
                    to="/courses"
                    className="mt-2 inline-block bg-brand text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:scale-105 border-2 border-transparent hover:bg-white hover:text-brand hover:border-brand"
                    style={{transitionDelay: '300ms'}}
                >
                    Explore All Courses
                </Link>
            </div>
        </div>
      </AnimatedSection>

      <style jsx global>{`
        /* Define custom Tailwind utilities used */
        .text-ui-headings { @apply text-edx-gray-dark; }
        .text-ui-text { @apply text-edx-gray; }
        .bg-ui-light { @apply bg-gray-50; }
      
        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(2rem);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes grid-pulse {
            0%, 100% { opacity: 0.05; }
            50% { opacity: 0.1; }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .animate-grid-pulse {
            animation: grid-pulse 8s ease-in-out infinite;
        }
        /* Fix for invalid CSS syntax */
        .bg-grid-white\\[\\/0\\.05\\] {
            background-image: linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px);
            background-size: 2rem 2rem;
        }
        .animated-section .stagger-child {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
            transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animated-section.is-visible .stagger-child {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
      `}</style>
    </div>
  );
};

export default HomePage;

