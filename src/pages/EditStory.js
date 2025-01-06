import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditStory.css';

const EditStory = () => {
  const { state } = useLocation(); // Mengambil data story dari navigasi sebelumnya
  const navigate = useNavigate();
  const storyData = state?.story || {}; // Jika tidak ada data, gunakan objek kosong

  const [formData, setFormData] = useState({
    title: storyData.title || '',
    author: storyData.author || '',
    category: storyData.category || '',
    keywords: storyData.keywords?.join(', ') || '',
    synopsis: storyData.synopsis || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Logika untuk menyimpan perubahan
    console.log('Story Updated:', formData);
    navigate('/story-list'); // Kembali ke daftar cerita
  };

  const handleCancel = () => {
    navigate('/story-list'); // Membatalkan dan kembali ke daftar cerita
  };

  return (
    <div className="edit-story-container">
      <header className="edit-story-header">
        <h1>Edit Story</h1>
      </header>
      <form className="edit-story-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter story title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Teen Fiction">Teen Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Non Fiction">Non Fiction</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="keywords">Keywords</label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="Enter keywords separated by commas"
          />
        </div>

        <div className="form-group">
          <label htmlFor="synopsis">Synopsis</label>
          <textarea
            id="synopsis"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            placeholder="Write a brief synopsis"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStory;
