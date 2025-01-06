import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { initialStories } from '../data';
import "./StoryDetail.css"

const StoryDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const story = initialStories.find((story) => story.id === parseInt(id));

    if (!story) {
        return <div>Story not found</div>;
    }
    
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="story-detail-container">
            <button className="back-button" onClick={handleBack}>
                <i className="fa fa-arrow-left"></i> Back
            </button>
            <h1>{story.title}</h1>
            <p><strong>Author:</strong> {story.author}</p>
            <p><strong>Category:</strong> {story.category}</p>
            <p><strong>Status:</strong> {story.status}</p>
            <p><strong>Keywords:</strong> {story.keywords.join(', ')}</p>
            <p><strong>Synopsis:</strong> {story.synopsis || 'No synopsis available'}</p>
        </div>
    );
};

export default StoryDetail;
