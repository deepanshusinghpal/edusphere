import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Globe } from 'lucide-react';

const Footer = () => {
  // --- THIS SECTION IS NOW UPDATED WITH YOUR PERSONAL LINKS ---
  const socialLinks = [
    { icon: <Facebook />, href: 'https://www.facebook.com/deepanshu.pal.16082004', name: 'Facebook' },
    { icon: <Linkedin />, href: 'https://www.linkedin.com/in/deepanshu-singh-pal/', name: 'LinkedIn' },
    { icon: <Instagram />, href: 'https://www.instagram.com/deepanshupal_2004/', name: 'Instagram' },
    { icon: <Globe />, href: 'https://deepanshusinghpal.github.io/', name: 'Website' },
  ];

  const footerSections = [
    {
      title: 'About',
      links: [{ text: 'About Us', path: '/about' }],
    },
    {
      title: 'Support',
      links: [{ text: 'Contact Us', path: '/contact' }],
    },
  ];

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0 md:col-span-2">
            <h2 className="text-3xl font-bold text-white">edusphere</h2>
            <p className="mt-4 text-gray-200">Empowering the world through education.</p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                // --- THESE LINKS NOW OPEN IN A NEW TAB ---
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-200 hover:text-white" 
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold tracking-wide uppercase text-gray-100">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.path} className="text-white hover:underline transition duration-300">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="my-10 border-white/20" />
        <div className="text-center text-gray-300">
          &copy; {new Date().getFullYear()} EduSphere, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

