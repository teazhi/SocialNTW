const User = require('./models/user_model');

exports.findUserByEmail = (req, res) => {
    // Find user document based on specified email
    User.findOne({ email: req.params.email })  // uses parameter from URL
        .then((user) => {
            if (user) {
                console.log('User found:', user);
                // Sends successful HTTP request to the client
                res.status(200).json(user);
            } else {
                console.log('User not found');
                // Sends unsuccessful HTTP request to the client
                res.status(404).send('User not found');
            }   
        })
        .catch((error) => {
            console.log('Error occurred while searching for user:', error);
            // Sends error HTTP request to the client
            res.status(500).send('Error occurred while searching for user:');
        });
};
