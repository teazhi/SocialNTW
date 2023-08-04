require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDatabase = require('./database');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user_routes');
const instagramRoutes = require('./routes/instagram_routes');
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await connectDatabase();
    } catch (error) {
        console.error('Failed to connect to the database', error.message);
        throw error;
    }
})();

// Enable CORS on all routes
app.use(cors({
    origin: ["https://www.socialntw.com"],
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'], // Add any other HTTP methods you need
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any other headers you need
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello");
})
app.use(userRoutes);
app.use('/instagram', instagramRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});