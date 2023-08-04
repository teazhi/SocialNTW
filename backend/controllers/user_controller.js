const User = require('../models/user_model');
const fetch = require('node-fetch');
const axios = require('axios');
const url = require('url');

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

exports.getInstagramDashboard = async (req, res) => {
    try {
        const CLIENT_ID = '6466673846783326';
        const CLIENT_SECRET = 'c1820458e70bebb7eebdf34e921a0c48';
        const REDIRECT_URI = 'http://www.socialntw.com/dashboard';
        const SCOPE = 'user_profile,user_media';

        const authorizationCode = new URL(req.url, `http://${req.headers.host}`).searchParams.get('code');

        if (!authorizationCode) {
            return res.redirect(`https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=code`);
        }

        const TOKEN_URL = 'https://api.instagram.com/oauth/access_token';
        const tokenResponse = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&code=${authorizationCode}`,
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const USER_DETAILS_URL = `https://graph.instagram.com/me?fields=id,username,profile_picture_url&access_token=${accessToken}`;
        const userDetailsResponse = await fetch(USER_DETAILS_URL);
        const userData = await userDetailsResponse.json();

        // Validate the response and fetch followers count
        if (userData.username && userData.profile_picture_url /* && userData.followers_count */) {
            const socialMediaData = {
                username: userData.username,
                profilePic: userData.profile_picture_url,
                followers: userData.followers_count // Adjust this according to the actual API
            };

            res.status(200).json(socialMediaData);
        } else {
            throw new Error('Invalid Instagram response');
        }
    } catch (error) {
        console.error('Error fetching Instagram followers:', error);
        res.status(500).json({});
    }
};