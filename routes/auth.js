const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/UserModel');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).render('auth/register', { error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ email, password: hashedPassword });
        await user.save();

        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).render('auth/login', { error: 'Incorrect email or password' });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/user/homepage');
        });
    }) (req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.session.destroy(err => {
            if (err) return next(err);
            res.redirect('/');
        });
    });
});

module.exports = router;