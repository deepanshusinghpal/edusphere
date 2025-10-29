import React, { useEffect, useState, useRef } from 'react';
import { Building, Target, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const InfoCard = ({ icon, title, children }) => (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-brand/20 hover:-translate-y-2 h-full flex flex-col">
        <div className="inline-block bg-brand/10 text-brand p-4 rounded-full mb-6 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-brand/20">
            {icon}
        </div>
        <h2 className="text-2xl font-bold text-ui-headings">{title}</h2>
        <p className="mt-2 text-gray-600">
            {children}
        </p>
    </div>
);


const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <header className="bg-brand-dark/5 pt-28 pb-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)] animate-grid-pulse"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transition-all duration-1000 ease-out transform opacity-0 translate-y-8 animate-fade-in-up">
            <h1 className="text-5xl font-extrabold text-ui-headings">About EduSphere</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto" style={{ animationDelay: '200ms' }}>
              Empowering the world through accessible, high-quality education. Our mission is to provide the skills to shape tomorrow, today.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <AnimatedSection className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
           <div className="stagger-child" style={{transitionDelay: `100ms`}}>
                <InfoCard icon={<Building size={32} />} title="Our Vision">
                    To create a global community of learners and educators, breaking down barriers to education and opportunity for everyone, everywhere.
                </InfoCard>
           </div>
           <div className="stagger-child" style={{transitionDelay: `250ms`}}>
                <InfoCard icon={<Target size={32} />} title="Our Mission">
                    We partner with the world's leading universities and companies to provide flexible, affordable, job-relevant online learning for individuals and organizations worldwide.
                </InfoCard>
           </div>
           <div className="stagger-child" style={{transitionDelay: `400ms`}}>
                <InfoCard icon={<Users size={32} />} title="Our Team">
                    We are a passionate team of educators, developers, and designers dedicated to building the future of online learning.
                </InfoCard>
           </div>
        </div>
      </AnimatedSection>
      
      {/* Our Story Section */}
      <AnimatedSection className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="stagger-child">
                <h2 className="text-4xl font-bold text-ui-headings mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                    Founded in 2025 by a group of passionate students, EduSphere began as a simple idea: to make high-quality tech education accessible to everyone, regardless of their background or location. We saw the gap between traditional education and the fast-paced demands of the tech industry and knew there had to be a better way.
                </p>
                <p className="text-gray-600">
                    From a small collection of curated video courses, we've grown into a thriving platform that serves a global community. Our commitment remains the same: to empower learners with the practical skills and knowledge they need to succeed in their careers and achieve their dreams.
                </p>
            </div>
            <div className="stagger-child" style={{transitionDelay: '200ms'}}>
                 <img src="https://placehold.co/600x400/e0e7ff/3730a3?text=Our+Journey" alt="Our team working" className="rounded-xl shadow-2xl"/>
            </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold max-w-3xl mx-auto text-brand-dark stagger-child">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-gray-700 mt-4 mb-8 max-w-xl mx-auto stagger-child" style={{transitionDelay: '150ms'}}>Explore our extensive catalog of courses and find the perfect path for you.</p>
          <Link
            to="/courses"
            className="mt-2 inline-block bg-brand text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-brand/40 transform hover:-translate-y-1 hover:scale-105 stagger-child"
            style={{transitionDelay: '300ms'}}
          >
            Explore Courses
          </Link>
        </div>
      </AnimatedSection>

       <style jsx global>{`
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
        .bg-grid-white\\/\\[0\\.05\\] {
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

export default AboutPage;