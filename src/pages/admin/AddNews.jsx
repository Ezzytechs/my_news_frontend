import React, { useState } from 'react';
import { createNews } from '../../api/api';
import Admin from './AdminHOC/admin';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../components/UI/Error';

const AddNews = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", text: "", images: null, tags: "" });
  const [error, setError] = useState(null); // State for error handling
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading during submission

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, images: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state to true
    setError(null); // Clear any previous errors

    const data = new FormData();
    data.append('title', formData.title);
    data.append('text', formData.text);
    data.append('tags', formData.tags.split(","));
    if (formData.images) {
      data.append('images', formData.images);
    }

    try {
      const newNews = await createNews(data);
      if (newNews) {
        navigate('/admin'); // Navigate to admin page on success
        setFormData({ title: "", text: "", images: null, tags: "" }); // Reset form
      }
    } catch (error) {
      setError(error.message || "Failed to create news. Please try again."); // Set error message
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  const clearError = () => {
    setError(null); // Clear the error
  };

  return (
    <Admin>
      <h1 className="text-2xl font-bold mt-2 text-center">Create News</h1>
      {error && <ErrorModal isOpen={error} onClose={clearError} />} 
      <form onSubmit={handleSubmit} className="mb-6 p-4 w-full max-w-[700px] mx-auto">
        <input
          type="text"
          placeholder="Title"
          className="block w-full p-2 mb-2 border"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Text"
          className="block w-full h-[200px] p-2 mb-2 border resize-none"
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          required
        />
        <input
          type="file"
          className="block w-full p-2 mb-2 border"
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="Tags (tag1,tag2...)"
          className="block w-full p-2 mb-2 border"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
        <p className='text-sm'>*use comma to separate tags</p>
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 rounded-md disabled:opacity-50"
          disabled={isSubmitting} 
        >
          {isSubmitting ? "Uploading..." : "Create News"}
        </button>
      </form>
    </Admin>
  );
};

export default AddNews;