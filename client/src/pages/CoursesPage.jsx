import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Filter, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import CourseCard from '../components/common/CourseCard';
import FilterSidebar from '../components/courses/FilterSidebar';
import { fetchCourses, reset } from '../store/slices/courseSlice';

const Pagination = ({ coursesPerPage, totalCourses, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    if (pageNumbers.length <= 1) return null;

    return (
        <nav className="flex items-center space-x-2">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50">
                <ChevronLeft size={20} />
            </button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-sm text-sm font-semibold ${currentPage === number ? 'bg-brand text-white' : 'hover:bg-gray-200'}`}
                >
                    {number}
                </button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length} className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50">
                <ChevronRight size={20} />
            </button>
        </nav>
    );
};

const CoursesPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dispatch = useDispatch();
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedFilters, setSelectedFilters] = useState({ Subject: [], Level: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  const { courses, status, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
    return () => { dispatch(reset()); };
  }, [dispatch]);

  // Effect to update filters when URL search or subject params change
  useEffect(() => {
    const subjectFromUrl = searchParams.get('subject');
    if (subjectFromUrl) {
        // When navigating from dropdown, clear other filters and set the new one
        setSelectedFilters({ Level: [], Subject: [subjectFromUrl] });
        setCurrentPage(1); // Reset to page 1
    }
  }, [searchParams]);

  const handleFilterChange = (filterType, option) => {
    setCurrentPage(1);
    setSelectedFilters(prev => {
      const current = prev[filterType] || [];
      const newSelection = current.includes(option) ? current.filter(item => item !== option) : [...current, option];
      
      const newSearchParams = new URLSearchParams(searchParams);
      if (newSelection.length > 0) {
          newSearchParams.set(filterType.toLowerCase(), newSelection.join(','));
      } else {
          newSearchParams.delete(filterType.toLowerCase());
      }
      setSearchParams(newSearchParams);

      return { ...prev, [filterType]: newSelection };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({ Subject: [], Level: [] });
    setSearchParams({});
    setCurrentPage(1);
  };

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    
    const searchTerm = searchParams.get('search')?.toLowerCase() || '';

    return courses.filter(course => {
      const searchMatch = searchTerm === '' || 
                          course.title.toLowerCase().includes(searchTerm) ||
                          (course.description && course.description.toLowerCase().includes(searchTerm));
      
      const subjectMatch = selectedFilters.Subject.length === 0 || (course.category && selectedFilters.Subject.includes(course.category.name));
      const levelMatch = selectedFilters.Level.length === 0 || (course.level && selectedFilters.Level.map(l => l.toUpperCase()).includes(course.level));

      return searchMatch && subjectMatch && levelMatch;
    });
  }, [courses, selectedFilters, searchParams]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderContent = () => {
    if (status === 'loading') {
      return <div className="flex justify-center items-center py-32"><Loader2 className="animate-spin h-12 w-12 text-brand" /></div>;
    }
    if (status === 'failed') {
      return <p className="text-center text-red-500 py-32">Error: {error}</p>;
    }
    if (currentCourses.length === 0 && courses.length > 0) {
      return <p className="text-center text-edx-gray py-32">No courses match your search or selected filters.</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {currentCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-edx-gray-light min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          
          <FilterSidebar 
            isOpen={isFilterOpen} 
            onClose={() => setIsFilterOpen(false)}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          <main className="w-full">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
              <h1 className="text-4xl font-bold text-edx-gray-dark mb-4 sm:mb-0">Explore Courses</h1>
              <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center self-start bg-white border px-4 py-2 rounded-sm text-edx-gray-dark hover:bg-gray-50">
                <Filter size={16} className="mr-2" /> Filters
              </button>
            </div>
            
            <div className="bg-white p-4 border border-gray-200 rounded-sm mb-8">
              <p className="text-sm text-edx-gray-dark">
                Showing <span className="font-bold">{currentCourses.length}</span> of <span className="font-bold">{filteredCourses.length}</span> results
              </p>
            </div>
            
            {renderContent()}

            <div className="mt-16 flex justify-center">
              <Pagination 
                coursesPerPage={coursesPerPage}
                totalCourses={filteredCourses.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

