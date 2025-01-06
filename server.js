// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const multer = require('multer');
const port = 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory store for stories
let stories = [];

// POST endpoint to add a new story
app.post('/api/stories', (req, res) => {
    const { title, author, synopsis, category, status, cover, tags } = req.body;

    // Simple validation
    if (!title || !author || !synopsis || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Add the new story to the array
    const newStory = {
        id: stories.length + 1,
        title,
        author,
        synopsis,
        category,
        status,
        cover,
        tags
    };

    stories.push(newStory);

    res.status(201).json({ message: 'Story added successfully', story: newStory });
});

// POST endpoint to add a new story
app.post('/api/stories', upload.single('cover'), (req, res) => {
    const { title, author, synopsis, category, status, tags } = req.body;
    const cover = req.file ? req.file.buffer : null; // Use the file data from `req.file` if available

    // Validate required fields
    if (!title || !author || !synopsis || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Add the new story to the array
    const newStory = {
        id: stories.length + 1,
        title,
        author,
        synopsis,
        category,
        status,
        cover,
        tags: tags ? tags.split(',') : [],
    };

    stories.push(newStory);

    res.status(201).json({ message: 'Story added successfully', story: newStory });
});

app.use(cors({
    origin: 'http://localhost:3000',  // Make sure to allow your React app's origin
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type',
}));

// GET endpoint to retrieve all stories
app.get('/api/stories', (req, res) => {
    res.status(200).json(stories);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});