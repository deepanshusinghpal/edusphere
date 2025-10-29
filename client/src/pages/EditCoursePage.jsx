import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseById, reset, createModule, createLesson } from '../store/slices/courseSlice';
import { Loader2, Plus, Video, FileText, ChevronDown } from 'lucide-react';

// Reusable accordion component (assuming ModuleAccordion is defined elsewhere or in this file)
const ModuleAccordion = ({ module, newLessonForms, handleLessonFormChange, handleAddLesson }) => {
  const [isOpen, setIsOpen] = useState(true); // Default to open

  return (
    <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-2 text-left"
      >
        <h3 className="text-xl font-bold text-edx-gray-dark">{module.title}</h3>
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold text-edx-gray-dark mb-4">Lessons</h4>
          <ul className="space-y-3">
            {module.lessons.map(lesson => (
              <li key={lesson.id} className="flex items-center p-3 rounded-sm bg-edx-gray-light text-edx-gray">
                {lesson.contentType === 'VIDEO' ? <Video size={16} className="mr-3" /> : <FileText size={16} className="mr-3" />}
                <span>{lesson.title}</span>
              </li>
            ))}
          </ul>
          
          {/* Add Lesson Form */}
          <form onSubmit={(e) => handleAddLesson(e, module.id)} className="mt-8 border-t pt-6">
            <h4 className="font-semibold mb-4 text-edx-gray-dark">Add New Lesson</h4>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Lesson Title (e.g., Introduction to Variables)"
                value={newLessonForms[module.id]?.title || ''}
                onChange={(e) => handleLessonFormChange(module.id, 'title', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand"
                required
              />
              <select 
                value={newLessonForms[module.id]?.contentType || 'VIDEO'}
                onChange={(e) => handleLessonFormChange(module.id, 'contentType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <option value="VIDEO">Video Lesson</option>
                <option value="TEXT">Text Lesson</option>
              </select>
              {(newLessonForms[module.id]?.contentType === 'VIDEO' || !newLessonForms[module.id]?.contentType) && (
                <input
                  type="text"
                  placeholder="YouTube Video URL (e.g., https://www.youtube.com/watch?v=...)"
                  value={newLessonForms[module.id]?.videoUrl || ''}
                  onChange={(e) => handleLessonFormChange(module.id, 'videoUrl', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              )}
              {newLessonForms[module.id]?.contentType === 'TEXT' && (
                <textarea
                  placeholder="Write your lesson content here. You can use HTML."
                  value={newLessonForms[module.id]?.content || ''}
                  onChange={(e) => handleLessonFormChange(module.id, 'content', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-sm h-32 focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              )}
            </div>
            <button type="submit" className="mt-6 bg-brand text-white px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-brand-dark">Add Lesson</button>
          </form>
        </div>
      )}
    </div>
  );
};


const EditCoursePage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  
  const { selectedCourse: course, status, error } = useSelector((state) => state.courses);
  
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newLessonForms, setNewLessonForms] = useState({});

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
    return () => { dispatch(reset()); };
  }, [courseId, dispatch]);
  
  const handleAddModule = (e) => {
    e.preventDefault();
    if (newModuleTitle.trim() === '') return;
    dispatch(createModule({ title: newModuleTitle, courseId }));
    setNewModuleTitle('');
  };

  const handleLessonFormChange = (moduleId, field, value) => {
    setNewLessonForms(prev => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], [field]: value }
    }));
  };

  const handleAddLesson = (e, moduleId) => {
    e.preventDefault();
    const lessonData = newLessonForms[moduleId];
    if (!lessonData || !lessonData.title) return;
    
    const finalLessonData = {
      ...lessonData,
      moduleId,
      order: (course.modules?.find(m => m.id === moduleId)?.lessons.length || 0) + 1, // Simple auto-order
      contentType: lessonData.contentType || 'VIDEO'
    };
    
    dispatch(createLesson(finalLessonData));
    setNewLessonForms(prev => ({ ...prev, [moduleId]: { title: '', contentType: 'VIDEO', videoUrl: '', content: '' } }));
  };

  if (status === 'loading' && !course) {
    return <div className="flex justify-center items-center h-screen bg-edx-gray-light"><Loader2 className="animate-spin h-16 w-16 text-brand" /></div>;
  }
  if (!course) {
    return <div className="text-center mt-20 p-8 bg-white rounded-sm shadow-sm border"><p className="text-edx-gray-dark">Course not found or you are not authorized to edit it.</p></div>;
  }

  return (
    <div className="bg-edx-gray-light min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <Link to="/instructor/dashboard" className="text-brand hover:text-brand-dark font-semibold flex items-center mb-8 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-edx-gray-dark">Edit Course Curriculum</h1>
        <p className="text-xl text-edx-gray mt-2">{course.title}</p>

        {/* Course Modules */}
        <div className="mt-12 space-y-8">
          {course.modules?.length === 0 && (
              <p className="text-edx-gray text-center p-8 bg-white rounded-sm shadow-sm border">No modules found. Add your first module below!</p>
          )}
          {course.modules?.map(module => (
            <ModuleAccordion 
                key={module.id} 
                module={module} 
                newLessonForms={newLessonForms} 
                handleLessonFormChange={handleLessonFormChange} 
                handleAddLesson={handleAddLesson} 
            />
          ))}

          {/* Add Module Form */}
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
            <form onSubmit={handleAddModule}>
              <h3 className="text-xl font-bold text-edx-gray-dark mb-5">Add a New Module</h3>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <input
                  type="text"
                  placeholder="New Module Title (e.g., Section 1: The Basics)"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  className="flex-grow p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand mb-4 sm:mb-0"
                  required
                />
                <button type="submit" className="bg-brand text-white font-semibold px-6 py-3 rounded-sm hover:bg-brand-dark flex items-center justify-center">
                  <Plus size={18} className="mr-2" /> Add Module
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;

