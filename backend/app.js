const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
    })
);

app.use(express.json());

app.use(cookieParser());



const userRoutes = require('./routes/user.routes');
const recipeRoutes = require('./routes/recipe.routes');

const authRoutes = require('./auth/authRoutes')

app.use('/',authRoutes)
app.use('/api', userRoutes);
app.use('/api/recipe', recipeRoutes);





// healthcheck 
 app.get('/api/healthcheck', (req, res) => {
    res.send('I am alive');
    });



module.exports = app;