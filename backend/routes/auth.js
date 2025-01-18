const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ensure this path is correct
const router = express.Router();

// Login with GitHub
router.get('/github', passport.authenticate('github', {
    scope: ['profile', 'email']
}));

// GitHub callback route
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/dashboard'); // Redirect to dashboard on success
});

// Email login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true // Enable flash messages for errors
}));

// Register route
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    
    try {
        await user.save();
        res.status(201).redirect('/login'); // Redirect to login after successful registration
    } catch (err) {
        res.status(400).send('Error registering user: ' + err.message);
    }
});

module.exports = router; 