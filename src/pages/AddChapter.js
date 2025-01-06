import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chapter.css'; // Menggunakan CSS Modules

const AddChapter = ({ story }) => {
    const [chapter, setChapter] = useState({
        title: '',
        story: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChapter({
            ...chapter,
            [name]: value,
        });
    };

    const handleSave = () => {
        console.log('Chapter saved:', chapter);
        navigate('/story-list');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="chapter-container">
            <div className="breadcrumb">
                <span>Story Management &gt; Add Stories &gt; </span>
                <span className="add-story-text">Add Chapter</span>
            </div>
            <h2 className="page-title">Add Chapter</h2>
            <button className="back-button" onClick={handleCancel}>
                <i className="fa fa-arrow-left"></i> Back
            </button>
            <form>
                <div className="input-group">
                    <div className="input-field">
                        <label>Chapter Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Chapter Title"
                            value={chapter.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="input-field">
                    <label>Story</label>
                    <textarea
                        name="story"
                        placeholder="Write your story here"
                        value={chapter.story}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="button-group">
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="save-button" onClick={handleSave}>Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddChapter;
