const express = require('express');
const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

router.get('/homepage', ensureAuthenticated, (req, res) => {
    res.render('user/homepage', { user: req.user });
});

module.exports = router;