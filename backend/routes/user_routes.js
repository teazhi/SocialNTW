const express = require('express');
const router = express.Router();
const User = require('../models/user_model');
// const { getInstagramFollowers } = require('./user_controller'); // Use require here

// router.get('/dashboard', userController.getInstagramDashboard);

// Route to create a new user and save it to the database
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({
        name,
        email,
        password
    });

    newUser.save()
        .then(() => {
            console.log('User created and saved');
            res.status(201).json(newUser);
        })
        .catch((error) => {
            console.error('Error saving user:', error);
            res.status(500).json({ error: 'Failed to save user' });
        });
});

// Route to check if user exists with the given email and password
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password })  
        .then((user) => {
            if (user) {
                console.log('User signed in:', user);
                res.status(200).json(user);
            } else {
                console.error('Sign in failed:', { email, password });
                res.status(400).json({ error: 'Email or password is incorrect' });
            }
        })
        .catch((error) => {
            console.error('Error signing in:', error);
            res.status(500).json({ error: 'Failed to sign in' });
        });
});

module.exports = router;
