require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
// const connectDatabase = require('./database');
const userController = require('./controllers/user_controller');
const userDatabase = require('./testuserdatabase');
const userRoutes = require('./routes/user_routes');

// Enable CORS on all routes
app.use(cors(
    origin = 'https://creative-croquembouche-4ca9dc.netlify.app/',
    methods = ['POST', 'GET'],
    credentials = true
));
app.use(express.json());
mongoose.connect('mongodb+srv://williamlin6803:gk0KNs9V9F5zRRFB@cluster0.bmghano.mongodb.net/AllUsers?retryWrites=true&w=majority')
app.use(userRoutes);

// connectDatabase();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
