const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ collection: 1, createdAt: -1 });
        res.render('user/homepage', { notes });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notes', error: err });
    }
});

router.get('/create', (req, res) => {
    res.render('notes/createNote');
});

router.post('/', async (req, res) => {
    const { title, content, collection } = req.body;
    try {
        console.log("Create new note route hit");
        const newNote = new Note({ 
            title,
            content,
            user: req.user._id,
            collection: collection || 'Uncategorized'
        });

        await newNote.save();

        const notes = await Note.find({ user: req.user._id });
        res.render('user/homepage', { user: req.user, notes });
    } catch (err) {
        console.error('Error creating note:', err);
        res.status(500).json({ message: 'Error creating note', error: err });
    }
});

router.put('/:id', async (req, res) => {
    const { title, content, collection } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, collection },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ message: 'Error updating note', error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
   