const express = require('express');
const router = express.Router();
const Note = require('../models/note');

function ensureAuthenticated(req, res, next) {
    console.log("Inside authentication middleware. req.user:", req.user);
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

router.get('/homepage', ensureAuthenticated, async (req, res) => {
    try {
        console.log("Logged in user ID:", req.user ? req.user._id : "No user found");

        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        console.log("Fetched notes:", notes);
        res.render('user/homepage', { user: req.user, notes });
    } catch (err) {
        console.error("Error fetching notes:", err);
        res.status(500).send('Server error');
    }
});

module.exports = router;