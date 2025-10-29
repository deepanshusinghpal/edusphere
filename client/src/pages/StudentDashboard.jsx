import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEnrolledCourses, reset } from '../store/slices/courseSlice';
import { Loader2 } from 'lucide-react';
import EnrolledCourseCard from '../components/dashboard/EnrolledCourseCard';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { courses: enrolledCourses, status, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchEnrolledCourses());
    return () => { dispatch(reset()); };
  }, [dispatch]);

  const renderContent = () => {
    if (status === 'loading') {
      return <div className="flex justify-center items-center py-24"><Loader2 className="animate-spin h-12 w-12 text-brand" /></div>;
    }
    if (status === 'failed') {
      return <p className="text-center text-red-500 py-24">Error: {error}</p>;
    }
    if (enrolledCourses.length === 0) {
      return (
        <div className="text-center py-24 bg-white border border-gray-200 rounded-sm shadow-sm">
          <h2 className="text-2xl font-bold text-edx-gray-dark">Start Your Learning Journey</h2>
          <p className="mt-4 text-edx-gray">You are not enrolled in any courses yet. Discover new skills today!</p>
          <Link to="/courses" className="mt-8 inline-block bg-brand text-white font-bold py-3 px-6 rounded-sm hover:bg-brand-dark transition-colors">
            Explore Courses
          </Link>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {enrolledCourses.map((course) => (
          <EnrolledCourseCard key={course.id} course={course} />
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-edx-gray-light min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-edx-gray-dark mb-10">My Learning</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default StudentDashboard;

