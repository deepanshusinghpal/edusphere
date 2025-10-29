import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Search, BrainCircuit, Code, BarChart, Palette, GraduationCap, Laptop, Building, Loader2, Cloud, ShieldCheck } from 'lucide-react';
import { fetchCourses, reset as resetCourses } from '../store/slices/courseSlice';
import { fetchContent } from '../store/slices/contentSlice';

// Import modular components
import CourseCard from '../components/common/CourseCard';
import CategoryCard from '../components/home/CategoryCard';
import ValuePropCard from '../components/home/ValuePropCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, status: courseStatus, error: courseError } = useSelector((state) => state.courses);
  const { content, status: contentStatus } = useSelector((state) => state.content);
  const [heroSearchTerm, setHeroSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false); // State for animation

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchContent());
    // Trigger fade-in animation
    setIsVisible(true);
    return () => { dispatch(resetCourses()); };
  }, [dispatch]);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearchTerm.trim()) {
      navigate(`/courses?search=${encodeURIComponent(heroSearchTerm.trim())}`);
      setHeroSearchTerm('');
    }
  };

  const categories = [
    { icon: <Code size={32} className="text-brand"/>, title: 'Programming', description: 'C, Python, Java, & more' },
    { icon: <BrainCircuit size={32} className="text-brand"/>, title: 'Data Science', description: 'Machine Learning & Big Data' },
    { icon: <Laptop size={32} className="text-brand"/>, title: 'Artificial Intelligence', description: 'Deep Learning & NLP' },
    { icon: <Palette size={32} className="text-brand"/>, title: 'Web Development', description: 'React, Node.js, & PERN' },
    { icon: <Cloud size={32} className="text-brand"/>, title: 'Cloud & DevOps', description: 'AWS, Docker, & Kubernetes' },
    { icon: <ShieldCheck size={32} className="text-brand"/>, title: 'Cybersecurity', description: 'Ethical Hacking & Security' },
    { icon: <BarChart size={32} className="text-brand"/>, title: 'Computer Fundamentals', description: 'DBMS, OS, & Networks' },
  ];
  const partners = ['Google', 'Meta', 'IBM', 'Microsoft', 'AWS', 'Harvard', 'MIT', 'Stanford'];
  const valueProps = [
    { icon: <GraduationCap size={32} className="text-brand" />, title: "Learn from experts", description: "Start, switch, or advance your career with thousands of courses.", linkText: "Explore all courses", linkTo: "/courses" },
    { icon: <Laptop size={32} className="text-brand" />, title: "Find flexible, affordable options", description: "Choose from many options including free courses and university degrees.", linkText: "Find a course for you", linkTo: "/courses" },
    { icon: <Building size={32} className="text-brand" />, title: "Upskill your organization", description: "With EduSphere for Business, achieve measurable learning outcomes.", linkText: "Get a demo", linkTo: "/business" },
  ];

  const renderFeaturedCourses = () => {
    if (courseStatus === 'loading') {
      return <div className="flex justify-center items-center h-48"><Loader2 className="animate-spin h-12 w-12 text-brand" /></div>;
    }
    if (courseStatus === 'failed') {
      return <p className="text-center text-red-500">Could not load courses. {courseError}</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.slice(0, 4).map(course => <CourseCard key={course.id} course={course} />)}
      </div>
    );
  };

  if (contentStatus === 'loading' || contentStatus === 'idle') {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-16 w-16 text-brand" /></div>;
  }

  return (
    <div className={`bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-28">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-ui-headings leading-tight max-w-4xl mx-auto">
            {content.hero_headline || 'Empower Your Tech Journey'}
          </h1>
          <p className="mt-6 text-lg text-ui-text max-w-3xl mx-auto">
            {content.hero_subtitle || 'Master Programming, Data Structures & Algorithms, and more.'}
          </p>
          <div className="mt-10 max-w-2xl mx-auto">
            <form className="relative" onSubmit={handleHeroSearch}>
              <input 
                type="text" 
                value={heroSearchTerm}
                onChange={(e) => setHeroSearchTerm(e.target.value)}
                placeholder="What do you want to learn?" 
                className="w-full pl-6 pr-16 py-4 text-lg border-2 border-ui-headings rounded-sm focus:outline-none focus:ring-2 focus:ring-brand" 
              />
              <button type="submit" className="absolute right-0 top-0 h-full bg-ui-headings text-white px-6 rounded-r-sm hover:bg-black transition-colors" aria-label="Search">
                <Search size={24} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-ui-light">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-base font-semibold text-ui-text uppercase tracking-wider">
            {content.partners_headline || 'We collaborate with leading organizations'}
          </h2>
          <div className="mt-10 grid grid-cols-4 md:grid-cols-8 gap-x-8 gap-y-6 items-center">
            {partners.map(partner => ( <div key={partner} className="text-2xl font-bold text-gray-400 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300">{partner}</div> ))}
          </div>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-ui-headings mb-20">{content.potential_headline || 'Unlock your potential'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">{valueProps.map(prop => <ValuePropCard key={prop.title} {...prop} />)}</div>
          </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-ui-light">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-ui-headings mb-16">{content.featured_headline || 'Featured courses'}</h2>
            {renderFeaturedCourses()}
        </div>
      </section>

      {/* Explore Top Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-ui-headings mb-16">{content.categories_headline || 'Explore top categories'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category) => (<CategoryCard key={category.title} {...category} />))}
          </div>
        </div>
      </section>
      
      {/* Final Call to Action */}
      <section className="py-24 bg-brand-superlight">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold max-w-3xl mx-auto text-brand-dark">
            {content.cta_headline || 'Take the next step'}
          </h2>
          <Link to="/courses" className="mt-10 inline-block bg-brand text-white px-10 py-4 rounded-sm text-lg font-semibold hover:bg-brand-dark transition duration-300">
            Explore All Courses
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

