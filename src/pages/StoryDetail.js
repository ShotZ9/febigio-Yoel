import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);

  useEffect(() => {
    // Fetch the story details based on the `id`
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

  const handleEdit = () => {
    navigate(`/story-list/edit/${id}`);
  };

  if (!story) return <div>Loading...</div>;

  return (
    <div className="story-detail-container">
      <h2>{story.title}</h2>
      <p><strong>Author:</strong> {story.author}</p>
      <p><strong>Synopsis:</strong> {story.synopsis}</p>
      <p><strong>Category:</strong> {story.category}</p>
      <p><strong>Status:</strong> {story.status}</p>
      <p><strong>Tags:</strong> {story.tags.join(', ')}</p>
      <button onClick={handleEdit}>Edit Story</button>
    </div>
  );
};

export default StoryDetail;
