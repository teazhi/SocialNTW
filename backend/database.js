const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to MongoDB database: ', error.message);
    }
};

module.exports = connectDatabase;