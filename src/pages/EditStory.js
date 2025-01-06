import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState({
    title: '',
    author: '',
    synopsis: '',
    category: '',
    status: 'Draft',
    tags: [],
  });

  useEffect(() => {
    // Fetch the story details based on the `id` for editing
    // For demo, using hardcoded data
    const fetchedStory = {
      id,
      title: 'Example Story Title',
      author: 'Example Author',
      synopsis: 'This is a synopsis of the story.',
      category: 'Fantasy',
      tags: ['example', 'tag'],
      status: 'Publish',
    };
    setStory(fetchedStory);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStory({
      ...story,
      [name]: value,
    });
  };

  const handleTagChange = (e) => {
    const { value } = e.target;
    setStory({
      ...story,
      tags: value.split(','),
    });
  };

  const handleSave = () => {
    // Save the edited story (e.g., send data to an API)
    console.log('Edited Story:', story);
    navigate('/story-list');
  };

  return (
    <div className="edit-story-container">
      <h2>Edit Story</h2>
      <form>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={story.title}
          onChange={handleInputChange}
        />

        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={story.author}
          onChange={handleInputChange}
        />

        <label>Synopsis:</label>
        <textarea
          name="synopsis"
          value={story.synopsis}
          onChange={handleInputChange}
        ></textarea>

        <label>Category:</label>
        <select
          name="category"
          value={story.category}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          <option value="Teen Fiction">Teen Fiction</option>
          <option value="Romance">Romance</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Non Fiction">Non Fiction</option>
        </select>

        <label>Tags:</label>
        <input
          type="text"
          placeholder="Enter tags separated by commas"
          onChange={handleTagChange}
        />

        <label>Status:</label>
        <select
          name="status"
          value={story.status}
          onChange={handleInputChange}
        >
          <option value="Draft">Draft</option>
          <option value="Publish">Publish</option>
        </select>

        <button type="button" onClick={handleSave}>Save Story</button>
      </form>
    </div>
  );
};

export default EditStory;
