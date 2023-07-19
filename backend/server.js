require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user_routes');

// Enable CORS on all routes
app.use(cors(
    {
        origin: 'https://social-ntw-api.vercel.app',
        methods: ['POST', 'GET'],
        credentials: true
    }
));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://williamlin6803:gk0KNs9V9F5zRRFB@cluster0.bmghano.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

app.get("/", (req, res) => {
    res.json("Hello");
})
app.use('/api', userRoutes);

app.listen(3001, () => {
    console.log(`Server running on port ${PORT}`);
});
