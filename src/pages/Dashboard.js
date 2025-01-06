import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
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
                        <p>10</p>
                    </div>
                    <div className="stat-box">
                        <h3>Published</h3>
                        <p>6</p>
                    </div>
                    <div className="stat-box">
                        <h3>Drafts</h3>
                        <p>4</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
