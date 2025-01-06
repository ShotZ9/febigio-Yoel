import React, { useState } from 'react';
import { FaSearch, FaFilter, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './StoryList.css';

const initialStories = [
  {
    id: 1,
    title: 'The Moon that Can\'t be Seen',
    author: 'Rara',
    category: 'Teen Fiction',
    keywords: ['school', 'fiction'],
    status: 'Draft',
    synopsis: '',
    cover: null,
    chapters: [],
  },
  {
    id: 2,
    title: 'Given',
    author: 'Sansa S.',
    category: 'Romance',
    keywords: ['music'],
    status: 'Draft',
    synopsis: '',
    cover: null,
    chapters: [],
  },
  {
    id: 3,
    title: 'Fish Swimming In The Sky',
    author: 'Kaenarita Faly',
    category: 'Fantasy',
    keywords: ['fantasy', 'romance'],
    status: 'Publish',
    synopsis: '',
    cover: null,
    chapters: [],
  },
  {
    id: 4,
    title: 'The Science of Fertility PCOS',
    author: 'Jessie Inchauspe',
    category: 'Non Fiction',
    keywords: ['science', 'PCOS'],
    status: 'Publish',
    synopsis: '',
    cover: null,
    chapters: [],
  },
  {
    id: 5,
    title: 'The Glucose Goddess Method',
    author: 'Jessie Inchauspe',
    category: 'Non Fiction',
    keywords: ['glucose', 'science'],
    status: 'Publish',
    synopsis: '',
    cover: null,
    chapters: [],
  },
];

const StoryList = () => {
  const [stories, setStories] = useState(initialStories);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: '', status: '' });
  const [temporaryFilters, setTemporaryFilters] = useState({ category: '', status: '' });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const resetTemporaryFilters = () => {
    setTemporaryFilters({ category: '', status: '' });
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setFilters({ category: '', status: '' });
    resetTemporaryFilters();
    setSearchTerm('');
    setShowFilterModal(false);
  };

  const applyFilters = () => {
    setFilters(temporaryFilters);
    setShowFilterModal(false);
  };

  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm) || story.author.toLowerCase().includes(searchTerm);
    const matchesCategory = filters.category ? story.category === filters.category : true;
    const matchesStatus = filters.status ? story.status === filters.status : true;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const indexOfLastStory = currentPage * itemsPerPage;
  const indexOfFirstStory = indexOfLastStory - itemsPerPage;
  const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredStories.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="story-list-container">
      <header className="story-list-header">
        <h1>Stories</h1>
      </header>

      <div className="story-list-actions">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by Writers/Title"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="actions-right">
          <div className="filter-container" onClick={() => setShowFilterModal(true)}>
            <FaFilter className="filter-icon" />
          </div>
          <div className="filter-divider" />
          <button
            className="add-story-button"
            onClick={() => navigate('/add-story')} // Navigate to the add story page
          >
            <FaPlus className="add-story-icon" />
            Add Story
          </button>
        </div>
      </div>

      <table className="story-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Writers</th>
            <th>Category</th>
            <th>Keyword</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <tr key={story.id}>
                <td>{story.id}</td>
                <td>{story.title}</td>
                <td>{story.author}</td>
                <td>{story.category}</td>
                <td>
                  {story.keywords.map((keyword, index) => (
                    <span key={index} className="tag-badge">
                      {keyword}
                    </span>
                  ))}
                </td>
                <td>
                  <span className={`status-badge ${story.status.toLowerCase()}`}>{story.status}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No stories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <span>
          Menampilkan {indexOfFirstStory + 1}-{Math.min(indexOfLastStory, filteredStories.length)} dari {filteredStories.length} data
        </span>
        <div className="pagination-controls">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <FaChevronLeft />
          </button>
          <div className="pagination-number">{currentPage}</div>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredStories.length / itemsPerPage)}>
            <FaChevronRight />
          </button>
        </div>
      </div>


      {showFilterModal && (
        <div className="filter-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Filter</h3>
              <button className="close-button" onClick={() => setShowFilterModal(false)}>×</button>
            </div>
            <div className="filter-group">
              <label>Category</label>
              <select
                value={temporaryFilters.category}
                onChange={(e) => setTemporaryFilters({ ...temporaryFilters, category: e.target.value })}
              >
                <option value="">All</option>
                <option value="Teen Fiction">Teen Fiction</option>
                <option value="Romance">Romance</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Non Fiction">Non Fiction</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select
                value={temporaryFilters.status}
                onChange={(e) => setTemporaryFilters({ ...temporaryFilters, status: e.target.value })}
              >
                <option value="">All</option>
                <option value="Publish">Publish</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div className="modal-actions">
              <button onClick={resetFilters} className="reset-button">Reset</button>
              <div className="modal-actions-right">
                <button onClick={() => setShowFilterModal(false)} className="cancel-button">Cancel</button>
                <button onClick={applyFilters} className="apply-button">Filter</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryList;
