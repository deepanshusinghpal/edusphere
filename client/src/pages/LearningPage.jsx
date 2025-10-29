import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseById, reset } from '../store/slices/courseSlice';
import { BookOpen, CheckCircle, PlayCircle, Loader2 } from 'lucide-react';

const LearningPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [activeLesson, setActiveLesson] = useState(null);

  const { selectedCourse: course, status } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courseId) { dispatch(fetchCourseById(courseId)); }
    return () => { dispatch(reset()); };
  }, [courseId, dispatch]);

  useEffect(() => {
    if (course?.modules?.[0]?.lessons?.[0] && !activeLesson) {
      setActiveLesson(course.modules[0].lessons[0]);
    }
  }, [course, activeLesson]);

  if (status === 'loading' || !course) {
    return <div className="flex justify-center items-center h-screen bg-edx-gray-light"><Loader2 className="animate-spin h-16 w-16 text-brand" /></div>;
  }
  
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      {/* Sidebar with course content */}
      <aside className="w-full lg:w-96 bg-edx-gray-light shadow-md overflow-y-auto border-r border-gray-200">
        <div className="p-4 border-b">
          <h2 className="font-bold text-xl text-edx-gray-dark">{course.title}</h2>
          <p className="text-sm text-edx-gray">by {course.instructor.name}</p>
        </div>
        <nav>
          {course.modules.map((module, moduleIndex) => (
            <div key={module.id} className="py-2">
              <h3 className="px-4 py-2 font-semibold text-edx-gray-dark tracking-wide text-base">
                Section {moduleIndex + 1}: {module.title}
              </h3>
              <ul>
                {module.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left px-4 py-3 flex items-center text-sm transition-colors ${
                        activeLesson?.id === lesson.id ? 'bg-brand/10 text-brand-dark font-semibold' : 'hover:bg-gray-100 text-edx-gray'
                      }`}
                    >
                      {lesson.contentType === 'VIDEO' ? 
                        <PlayCircle size={16} className="mr-3 flex-shrink-0" /> : 
                        <BookOpen size={16} className="mr-3 flex-shrink-0" />}
                      <span className="flex-grow">{lesson.title}</span>
                      <CheckCircle size={16} className="text-green-500 ml-2 flex-shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-12 overflow-y-auto">
        {activeLesson ? (
          <div>
            <h1 className="text-3xl font-bold text-edx-gray-dark mb-6">{activeLesson.title}</h1>
            {activeLesson.contentType === 'VIDEO' && activeLesson.videoUrl ? (
              <div className="aspect-video bg-black rounded-lg shadow-md overflow-hidden">
                <iframe 
                    className="w-full h-full"
                    src={getYouTubeEmbedUrl(activeLesson.videoUrl)} 
                    title={activeLesson.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
              </div>
            ) : (
              <div className="prose max-w-none mt-6 text-edx-gray" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
            )}
            
            {/* Navigation buttons */}
            <div className="mt-12 flex justify-between border-t pt-6">
                <button className="bg-edx-gray-light text-edx-gray-dark font-semibold py-2 px-4 rounded-sm hover:bg-gray-200 transition-colors">
                    &larr; Previous
                </button>
                 <button className="bg-brand text-white font-semibold py-2 px-4 rounded-sm hover:bg-brand-dark transition-colors">
                    Mark as Complete &rarr;
                </button>
            </div>
          </div>
        ) : (
          <p className="text-edx-gray text-lg py-12 text-center">Select a lesson from the sidebar to begin your learning journey.</p>
        )}
      </main>
    </div>
  );
};

export default LearningPage;

