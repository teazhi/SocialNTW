require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDatabase = require('./database');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user_routes');
const PORT = process.env.PORT || 3000;

// connectDatabase();

// Enable CORS on all routes
app.use(cors(
    {
        origin: ["https://social-ntw-frontend.vercel.app"],
        methods: ['POST', 'GET'],
        credentials: true
    }
));

app.use(express.json());

// Connect to MongoDB
// mongoose.connect('mongodb+srv://williamlin6803:gk0KNs9V9F5zRRFB@cluster0.bmghano.mongodb.net/AllUsers?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch((err) => console.log('MongoDB connection error:', err));

app.get("/", (req, res) => {
    res.json("Hello");
})
app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
