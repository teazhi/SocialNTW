const User = require('../models/user_model');
const axios = require('axios');

// creates User object based on request from client
exports.signUp = (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    const newUser = new User({
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password, 
    });

    // Saves the new User object to the database and sends a query to MongoDB
    newUser.save()
        .then((savedUser) => {
            // Sends successful HTTP request to the client
            res.status(201).json(savedUser);
        })
        .catch(err => {
            // Sends error HTTP request to the client
            res.status(500).send(err);
        });
};

exports.getInstagramFollowers = async (req, res) => {
    const username = 'socialntw'; // Retrieve this from the user's profile or request
    const accessToken = 'your_access_token_here'; // Retrieve this securely

    try {
        const response = await axios.get(`https://graph.instagram.com/${username}?fields=id,username,followers_count&access_token=${accessToken}`);
        res.json({
            username: response.data.username,
            followers: response.data.followers_count,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving followers');
    }
};
