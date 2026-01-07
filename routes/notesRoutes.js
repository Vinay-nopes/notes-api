const express = require('express');
const router = express.Router();
const notes = require('../data/notes');
const validateNote = require('../middleware/validateNote');

// GET /api/notes - Fetch all notes
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: notes.length,
        data: notes
    });
});

// GET /api/notes/:id - Fetch a single note by ID
router.get('/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    const note = notes.find(n => n.id === noteId);

    if (!note) {
        return res.status(404).json({
            success: false,
            message: `Note with id ${noteId} not found`
        });
    }

    res.json({
        success: true,
        data: note
    });
});

// POST /api/notes - Create a new note
router.post('/', validateNote, (req, res) => {
    const { title, content } = req.body;

    const newNote = {
        id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1, // Simple ID generation
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date()
    };

    notes.push(newNote);

    res.status(201).json({
        success: true,
        message: "Note created successfully",
        data: newNote
    });
});

// PUT /api/notes/:id - Update an existing note
router.put('/:id', validateNote, (req, res) => {
    const noteId = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === noteId);

    if (noteIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Note with id ${noteId} not found`
        });
    }

    const { title, content } = req.body;

    // Update the note
    notes[noteIndex] = {
        ...notes[noteIndex],
        title: title.trim(),
        content: content.trim()
        // createdAt remains the same, could add updatedAt
    };

    res.json({
        success: true,
        message: "Note updated successfully",
        data: notes[noteIndex]
    });
});

// DELETE /api/notes/:id - Delete a note
router.delete('/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === noteId);

    if (noteIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Note with id ${noteId} not found`
        });
    }

    // Remove note from array
    notes.splice(noteIndex, 1);

    res.json({
        success: true,
        message: "Note deleted successfully",
        data: {} // Standard REST practice to return empty object or null on delete
    });
});

module.exports = router;
