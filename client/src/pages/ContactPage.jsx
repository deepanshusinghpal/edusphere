import React, { useEffect, useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, User, MessageSquare, Loader2 } from 'lucide-react';
import axios from 'axios'; // <-- Import axios

// (This custom hook for observing elements remains unchanged)
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
  // --- NEW: State for form data, loading, and success/error ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({ submitted: false, error: '' });
  const [isVisible, setIsVisible] = useState(false); // For staggering

  const { name, email, message } = formData;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // --- NEW: Handle form input changes ---
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- UPDATED: HandleSubmit function ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ submitted: false, error: '' });
    
    try {
      // This is the new API call
      await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData);
      
      setFormStatus({ submitted: true, error: '' });
      setFormData({ name: '', email: '', message: '' }); // Clear form
      
      setTimeout(() => {
          setFormStatus({ submitted: false, error: '' });
      }, 5000);

    } catch (err) {
      // Handle errors from the server (like validation)
      const errorMsg = err.response?.data?.errors?.[0]?.msg || 'Could not send message. Please try again.';
      setFormStatus({ submitted: false, error: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* (Header remains the same) */}
      <header className="bg-brand pt-28 pb-32 overflow-hidden relative z-10">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)] animate-grid-pulse"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transition-all duration-1000 ease-out transform opacity-0 translate-y-8 animate-fade-in-up">
            <h1 className="text-5xl font-extrabold text-white">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto" style={{ animationDelay: '200ms' }}>
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <AnimatedSection className="container mx-auto px-6 py-24 relative z-1">
        <div className="max-w-6xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-2xl grid md:grid-cols-2 gap-16">
            {/* Contact Info (remains the same) */}
            <div className="stagger-child">
                <h2 className="text-3xl font-bold text-edx-gray-dark mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
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
          
            {/* --- CONTACT FORM UPDATED --- */}
            <div className="stagger-child" style={{transitionDelay: '200ms'}}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className={`stagger-child ${isVisible ? 'stagger-child-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                  <label htmlFor="name" className="block text-sm font-medium text-edx-gray-dark">Full Name</label>
                  <div className="mt-1 relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-gray-400" />
                    </span>
                    <input type="text" id="name" name="name" value={name} onChange={onChange} required className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand shadow-sm" />
                  </div>
                </div>
                <div className={`stagger-child ${isVisible ? 'stagger-child-visible' : ''}`} style={{ transitionDelay: '400ms' }}>
                  <label htmlFor="email" className="block text-sm font-medium text-edx-gray-dark">Email Address</label>
                  <div className="mt-1 relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </span>
                    <input type="email" id="email" name="email" value={email} onChange={onChange} required className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand shadow-sm" />
                  </div>
                </div>
                <div className={`stagger-child ${isVisible ? 'stagger-child-visible' : ''}`} style={{ transitionDelay: '500ms' }}>
                  <label htmlFor="message" className="block text-sm font-medium text-edx-gray-dark">Message</label>
                  <div className="mt-1 relative">
                     <span className="absolute top-3.5 left-0 flex items-center pl-3">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </span>
                    <textarea id="message" name="message" rows="4" value={message} onChange={onChange} required className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand shadow-sm"></textarea>
                  </div>
                </div>
                <div className={`stagger-child ${isVisible ? 'stagger-child-visible' : ''}`} style={{ transitionDelay: '600ms' }}>
                  <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:bg-brand/50">
                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : <><Send size={18} className="mr-2" /> Send Message</>}
                  </button>
                </div>
              </form>
               {formStatus.submitted && (
                    <div className="mt-6 flex items-center bg-green-100 text-green-800 p-4 rounded-lg animate-fade-in-up">
                        <CheckCircle size={20} className="mr-3" />
                        <p className="text-sm font-medium">Thank you for your message! We will get back to you shortly.</p>
                    </div>
                )}
                {formStatus.error && (
                    <div className="mt-6 flex items-center bg-red-100 text-red-800 p-4 rounded-lg animate-fade-in-up">
                        <p className="text-sm font-medium">{formStatus.error}</p>
                    </div>
                )}
            </div>
        </div>
      </AnimatedSection>

       {/* (Styling block remains the same) */}
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
        .bg-grid-white\\[\\/0\\.05\\] {
            background-image: linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px);
            background-size: 2rem 2rem;
        }
        .animated-section .stagger-child {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
            transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animated-section.is-visible .stagger-child,
        .stagger-child-visible { /* Added this for contact page form */
            opacity: 1;
            transform: translateY(0) scale(1);
        }
      `}</style>
    </div>
  );
};

export default ContactPage;