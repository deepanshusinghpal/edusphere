import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseById, reset } from '../store/slices/courseSlice';
import { Star, Loader2, BookOpen, ExternalLink, Clock, BarChart2 } from 'lucide-react';
import axios from 'axios';
import StickyEnrollCard from '../components/courses/StickyEnrollCard';

const CourseDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const { selectedCourse: course, status: courseStatus, error: courseError } = useSelector((state) => state.courses);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) { dispatch(fetchCourseById(id)); }
    return () => { dispatch(reset()); };
  }, [id, dispatch]);

  const handleEnrollAndRedirect = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsEnrolling(true);
    try {
      const config = { headers: { 'x-auth-token': token } };
      // Enroll silently in the background
      await axios.post(`${import.meta.env.VITE_API_URL}/courses/${course.id}/enroll-free`, {}, config);
      
      // Always open the link
      if (course.link) {
        window.open(course.link, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      // If already enrolled, that's okay. Just open the link.
      if (error.response?.data?.msg === 'You are already enrolled in this course.') {
        if (course.link) {
          window.open(course.link, '_blank', 'noopener,noreferrer');
        }
      } else {
        alert(error.response?.data?.msg || 'An error occurred during enrollment.');
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  if (courseStatus === 'loading' || courseStatus === 'idle' || !course) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-16 w-16 text-brand" /></div>;
  }

  return (
    <div className="bg-white">
      {/* Mobile Enroll Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40">
        <button 
          onClick={handleEnrollAndRedirect} 
          disabled={isEnrolling}
          className="w-full bg-brand text-white font-semibold py-3 px-6 rounded-sm hover:bg-brand-dark transition disabled:bg-brand/50 flex items-center justify-center"
        >
          {isEnrolling ? 'Processing...' : 'Start Now'}
          {course.link && <ExternalLink size={16} className="ml-2" />}
        </button>
      </div>

      {/* Header Section */}
      <header className="bg-brand-superlight border-b border-gray-200 pt-16 pb-16">
        <div className="container mx-auto px-6">
          <div className="lg:w-2/3">
            <p className="text-lg font-semibold text-brand-dark mb-3">{course.category.name}</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-edx-gray-dark">{course.title}</h1>
            <p className="text-base mt-4 text-edx-gray max-w-3xl">{course.description}</p>
            <div className="flex items-center mt-6 space-x-6">
              {course.reviewCount > 0 && (
                <div className="flex items-center text-edx-gray-dark">
                  <Star size={18} className="text-yellow-400 fill-current mr-2" />
                  <span className="font-semibold">{course.avgRating.toFixed(1)} ({course.reviewCount} reviews)</span>
                </div>
              )}
              <div className="flex items-center text-edx-gray-dark">
                <span className="text-lg font-semibold">Created by {course.instructor.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="lg:grid lg:grid-cols-3 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 rounded-sm p-8 mb-12">
              <h2 className="text-2xl font-bold text-edx-gray-dark mb-6">What you'll learn</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-edx-gray">
                {course.whatYouWillLearn.map((point, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-edx-green mr-3 mt-1">&#10003;</span>
                        <span>{point}</span>
                    </li>
                ))}
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-edx-gray-dark mb-8">Course Content</h2>
            {/* --- THIS IS THE FINAL, CORRECTED "COURSE CONTENT" SECTION --- */}
            <div className="border border-gray-200 rounded-sm p-8">
              <ul className="space-y-4">
                {course.courseContent?.map((topic, index) => (
                  <li key={index} className="flex items-center text-edx-gray-dark">
                    <BookOpen size={18} className="mr-4 text-brand flex-shrink-0" />
                    <span className="font-semibold">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (Desktop) */}
          <div className="hidden lg:block">
            <StickyEnrollCard 
                course={course} 
                onEnroll={handleEnrollAndRedirect} 
                isProcessing={isEnrolling} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;

