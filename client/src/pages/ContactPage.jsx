import React, { useEffect, useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

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


const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here (e.g., API call)
    setIsSubmitted(true);
    e.target.reset(); // Clear form fields
    
    // Hide the success message after a few seconds
    setTimeout(() => {
        setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <header className="bg-brand-dark/5 pt-28 pb-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)] animate-grid-pulse"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transition-all duration-1000 ease-out transform opacity-0 translate-y-8 animate-fade-in-up">
            <h1 className="text-5xl font-extrabold text-ui-headings">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto" style={{ animationDelay: '200ms' }}>
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <AnimatedSection className="container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-2xl grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="stagger-child">
                <h2 className="text-3xl font-bold text-ui-headings mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                    Fill out the form, and our team will get back to you within 24 hours. You can also reach us through the channels below.
                </p>
                <div className="space-y-6">
                    <div className="flex items-center">
                        <div className="bg-brand/10 text-brand p-3 rounded-full">
                            <Mail size={20} />
                        </div>
                        <span className="ml-4 text-gray-700">2004deepanshusingh@gmail.com</span>
                    </div>
                     <div className="flex items-center">
                        <div className="bg-brand/10 text-brand p-3 rounded-full">
                            <Phone size={20} />
                        </div>
                        <span className="ml-4 text-gray-700">+91 95402 64270</span>
                    </div>
                     <div className="flex items-center">
                        <div className="bg-brand/10 text-brand p-3 rounded-full">
                            <MapPin size={20} />
                        </div>
                        <span className="ml-4 text-gray-700">Kurnool, Andhra Pradesh, India</span>
                    </div>
                </div>
            </div>
          
            {/* Contact Form */}
            <div className="stagger-child" style={{transitionDelay: '200ms'}}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-800">Full Name</label>
                  <div className="mt-1">
                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition-shadow" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email Address</label>
                  <div className="mt-1">
                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition-shadow" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-800">Message</label>
                  <div className="mt-1">
                    <textarea id="message" name="message" rows="4" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition-shadow"></textarea>
                  </div>
                </div>
                <div>
                  <button type="submit" className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                    <Send size={18} className="mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
               {isSubmitted && (
                    <div className="mt-6 flex items-center bg-green-100 text-green-800 p-4 rounded-lg animate-fade-in-up">
                        <CheckCircle size={20} className="mr-3" />
                        <p className="text-sm font-medium">Thank you for your message! We will get back to you shortly.</p>
                    </div>
                )}
            </div>
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

export default ContactPage;

