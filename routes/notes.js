const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notes', error: err });
    }
});

router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ message: 'Error creating note', error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Note.findByIdAndDelete(req.params.id);
        if (result) res.json({ message: 'Note deleted successfully' });
        else res.status(404).json({ message: 'Note not found' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting note', error: err });
    }
});

module.exports = router;