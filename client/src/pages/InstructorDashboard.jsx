import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Loader2 } from 'lucide-react';
import { fetchInstructorCourses, reset } from '../store/slices/courseSlice';
import CourseManager from '../components/dashboard/CourseManager';
import CreateCourseModal from '../components/dashboard/CreateCourseModal';

const InstructorDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  
  const { courses, status, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchInstructorCourses());
    return () => { dispatch(reset()); };
  }, [dispatch]);
  
  const renderContent = () => {
    if (status === 'loading') {
      return <div className="text-center p-12 bg-white rounded-lg shadow-sm border"><Loader2 className="animate-spin h-8 w-8 mx-auto text-brand" /></div>;
    }
    if (status === 'failed') {
      return <p className="text-center text-red-500 p-12 bg-white rounded-lg shadow-sm border">Error: {error}</p>;
    }
    if (courses.length === 0) {
        return (
            <div className="text-center py-24 bg-white border border-gray-200 rounded-sm shadow-sm">
                <h2 className="text-2xl font-bold text-edx-gray-dark">No Courses Created Yet</h2>
                <p className="mt-4 text-edx-gray">Start building your curriculum today!</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-6 bg-brand text-white font-bold py-3 px-5 rounded-sm hover:bg-brand-dark transition-colors flex items-center justify-center mx-auto"
                >
                    <Plus size={20} className="mr-2" />
                    Create Your First Course
                </button>
            </div>
        );
    }
    return <CourseManager courses={courses} />;
  };

  return (
    <>
      <div className="bg-edx-gray-light min-h-screen">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10">
            <h1 className="text-4xl font-bold text-edx-gray-dark mb-4 sm:mb-0">Instructor Dashboard</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-brand text-white font-bold py-3 px-5 rounded-sm hover:bg-brand-dark transition-colors flex items-center justify-center self-start sm:self-auto"
            >
              <Plus size={20} className="mr-2" />
              Create New Course
            </button>
          </div>
          {renderContent()}
        </div>
      </div>
      <CreateCourseModal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false);
          dispatch(fetchInstructorCourses());
      }} />
    </>
  );
};

export default InstructorDashboard;

