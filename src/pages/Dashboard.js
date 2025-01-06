import React from 'react';
import { initialStories } from '../data';
import './Dashboard.css';

const Dashboard = () => {
    const totalStories = initialStories.length;
    const publishedStories = initialStories.filter(story => story.status === 'Publish').length;
    const draftStories = initialStories.filter(story => story.status === 'Draft').length;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
            </header>
            <main className="dashboard-content">
                <p>Welcome to your dashboard! Here you can manage your stories and view statistics.</p>
                <div className="dashboard-stats">
                    <div className="stat-box">
                        <h3>Total Stories</h3>
                        <p>{totalStories}</p>
                    </div>
                    <div className="stat-box">
                        <h3>Published</h3>
                        <p>{publishedStories}</p>
                    </div>
                    <div className="stat-box">
                        <h3>Drafts</h3>
                        <p>{draftStories}</p>
                    </div>
                </div>

                <div className="story-list">
                    <h2>Your Stories</h2>
                    <table className="dashboard-story-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialStories.map((story, index) => (
                                <tr key={story.id}>
                                    <td>{index + 1}</td>
                                    <td>{story.title}</td>
                                    <td>{story.author}</td>
                                    <td>{story.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
