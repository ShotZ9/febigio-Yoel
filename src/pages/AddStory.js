import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AddStory.css";
import 'font-awesome/css/font-awesome.min.css';

const AddStory = () => {
    const [story, setStory] = useState({
        title: '',
        writer: '',
        synopsis: '',
        category: '',
        tags: '',
        cover: null,
        status: 'Draft',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStory({
            ...story,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setStory({
            ...story,
            cover: e.target.files[0],
        });
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('title', story.title);
        formData.append('writer', story.writer);
        formData.append('synopsis', story.synopsis);
        formData.append('category', story.category);
        formData.append('tags', story.tags);
        formData.append('status', story.status);

        if (story.cover) {
            formData.append('cover', story.cover);
        }

        try {
            const response = await fetch('http://localhost:5000/api/stories', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Story Saved:', result);
                navigate('/story-list');
            } else {
                console.error('Failed to save story:', result.error);
            }
        } catch (error) {
            console.error('Error saving story:', error);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleAddChapter = () => {
        navigate('/add-chapter');
    };

    return (
        <div className="add-story-container">
            <div className="breadcrumb">
                <span>Story Management &gt; </span>
                <span className="add-story-text">Add Stories</span>
            </div>
            <h2 className="page-title">Add Stories</h2>
            <button className="back-button" onClick={handleBack}>
                <i className="fa fa-arrow-left"></i> Back
            </button>
            <form>
                <div className="input-group">
                    <div className="input-field">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={story.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label>Writer Name</label>
                        <input
                            type="text"
                            name="writer"
                            placeholder="Writer Name"
                            value={story.writer}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="input-field">
                    <label>Synopsis</label>
                    <textarea
                        name="synopsis"
                        placeholder="Synopsis"
                        value={story.synopsis}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* Category and Tags side-by-side */}
                <div className="input-group">
                    <div className="input-field half-width">
                        <label>Category</label>
                        <select
                            name="category"
                            value={story.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Category</option>
                            <option value="Teen Fiction">Teen Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Non Fiction">Non Fiction</option>
                        </select>
                    </div>
                    <div className="input-field half-width">
                        <label>Tags/Keywords Story</label>
                        <input
                            type="text"
                            name="tags"
                            value={story.tags}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-field half-width">
                        <label>Cover Image</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="input-field half-width">
                        <label>Status</label>
                        <select
                            name="status"
                            value={story.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="Draft">Draft</option>
                            <option value="Publish">Publish</option>
                        </select>
                    </div>
                </div>

                <div className="add-chapter-container">
                    <button className="add-chapter-button" onClick={handleAddChapter}>
                        <i className="fa fa-plus"></i> Add Chapter
                    </button>
                </div>

                <div className="chapter-table-container">
                    <table className="chapter-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>The Moon that Can't Be Seen</td>
                                <td>18 January 2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="button-group">
                    <button className="cancel-button" type="button" onClick={() => navigate('/story-list')}>Cancel</button>
                    <button className="save-button" type="button" onClick={handleSave}>Save</button>
                </div>

            </form>
        </div>
    );
};

export default AddStory;
