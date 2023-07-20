const mongoose = require('mongoose');

// Establish connection with MongoDB Atlas database
const connectDatabase = () => {
    console.log("Connecting DB..")
    console.log(process.env.DB_URI)
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log('Error connecting to MangoDB database: ', error.message);
    });
};

// Export the connectDatabase function to be used in other files
module.exports = connectDatabase;
