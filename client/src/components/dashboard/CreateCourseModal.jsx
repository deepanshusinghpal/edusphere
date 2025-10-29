import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { createCourse } from '../../store/slices/courseSlice';

const CreateCourseModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.courses);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: 'c3c2b8b5-3d4e-4b7f-8b2a-2d9f3e7c1a9e', // Placeholder for now
    thumbnail: '',
  });

  const { title, description, price, categoryId, thumbnail } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      ...formData,
      price: parseFloat(price) // Ensure price is a number
    };
    dispatch(createCourse(courseData)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        onClose(); // Close modal on success
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Create a New Course</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Course Title</label>
              <input type="text" id="title" name="title" value={title} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Introduction to JavaScript" required />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Course Description</label>
              <textarea id="description" name="description" value={description} onChange={onChange} rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe what this course is about..." required></textarea>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 <div>
                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price ($)</label>
                    <input type="number" id="price" name="price" value={price} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 49.99" required />
                </div>
                <div>
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    {/* In a real app, this would be populated from an API */}
                    <select id="category" name="categoryId" value={categoryId} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="c3c2b8b5-3d4e-4b7f-8b2a-2d9f3e7c1a9e">Computer Science</option>
                        <option value="some-other-uuid">Business</option>
                        <option value="another-uuid">Data Science</option>
                    </select>
                </div>
            </div>
             <div className="mb-6">
              <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">Thumbnail URL</label>
              <input type="text" id="thumbnail" name="thumbnail" value={thumbnail} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." required />
            </div>
            {error && status === 'failed' && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300">
                Cancel
              </button>
              <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700" disabled={status === 'loading'}>
                {status === 'loading' ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseModal;

