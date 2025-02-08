const express = require('express');
const Note = require('../models/note');
const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ collection: 1, createdAt: -1 });

        res.render('user/homepage', { user: req.user, notes });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notes', error: err });
    }
});

router.get('/create', ensureAuthenticated, (req, res) => {
    res.render('notes/createNote');
});

router.get('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.render('notes/viewNote', { note });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching note', error: err });
    }
});

router.post('/', ensureAuthenticated, async (req, res) => {
    const { title, content, collection } = req.body;
    try {
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

router.get('/:id/edit', ensureAuthenticated, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.render('notes/editNote', { note });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching note', error: err });
    }
});

router.put('/:id', ensureAuthenticated, async (req, res) => {
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

        res.redirect(`/notes/${updatedNote.id}`);
    } catch (err) {
        res.status(500).json({ message: 'Error updating note', error: err });
    }
});

router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const result = await Note.findByIdAndDelete(req.params.id);

        if (result) {
            req.session.message = 'Note deleted successfully';
            return res.redirect('/notes');
        } else {
            req.session.message = 'Note not found';
            return res.redirect('/user/homepage');
        }
    } catch (err) {
        console.error('Error deleting note:', err);
        req.session.message = 'Error deleting note';
        return res.redirect('/notes');
    }
});

module.exports = router;