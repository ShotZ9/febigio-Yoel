import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { FaTh, FaBook } from 'react-icons/fa';
import './App.css';
import StoryList from './pages/StoryList';
import Dashboard from './pages/Dashboard';
import AddStory from './pages/AddStory';
import AddChapter from './pages/AddChapter';
import StoryDetail from './pages/StoryDetail';
import EditStory from './pages/EditStory';
import logo from './logo.svg';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

const MainApp = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const isActiveLink = (path) => {
    const storyPaths = [
      '/story-list',
      '/story-detail/:id',
      '/edit-story/:id',
      '/add-story',
      '/add-chapter'
    ];

    if (path === '/') {
      return location.pathname === path ? 'active' : '';
    }

    return storyPaths.some((storyPath) => location.pathname.includes(storyPath.replace(':id', '')))
      ? 'active'
      : '';
  };

  return (
    <div className="App">
      <div className="sidebar">
        <img src={logo} alt="storiku" className="logo" />
        <nav className="navigation">
          <ul>
            <Link
              to="/"
              className={`nav-item ${isActiveLink('/')}`}
              onClick={() => setActiveLink('/')}>
              <li className="nav-link">
                <FaTh className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>

            <Link
              to="/story-list"
              className={`nav-item ${isActiveLink('/story-list')}`}
              onClick={() => setActiveLink('/story-list')}>
              <li className="nav-link">
                <FaBook className="icon" />
                <span>Story Management</span>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/story-list" element={<StoryList />} />
          <Route path="/story-detail/:id" element={<StoryDetail />} />
          <Route path="/edit-story/:id" element={<EditStory />} />
          <Route path="/add-story" element={<AddStory />} />
          <Route path="/add-chapter" element={<AddChapter />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
