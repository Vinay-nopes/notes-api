const express = require('express');
const app = express();
const notesRoutes = require('./routes/notesRoutes');

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Optional: Simple Authentication Middleware
// Checks for 'x-api-key' header
// const apiKeyAuth = (req, res, next) => {
//     const apiKey = req.headers['x-api-key'];
//     if (apiKey && apiKey === 'my-secret-key') {
//         next();
//     } else {
//         res.status(401).json({ success: false, message: 'Unauthorized: Invalid API Key' });
//     }
// };
// app.use(apiKeyAuth); 

// Mount Notes Routes
app.use('/api/notes', notesRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Blog/Notes API. Visit /api/notes to see all notes.');
});

// Handle 404 (Route not found)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
