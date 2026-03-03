const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const { authenticateToken, generateToken } = require('./controllers/auth');

const professorRoutes = require('./routes/professors');
const courseRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');

mongoose.connect('mongodb://127.0.0.1:27017/utnapi');

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());


app.use('/auth', authRoutes);

app.use('/professor', authenticateToken, professorRoutes);
app.use('/course', authenticateToken, courseRoutes);


// Start server
app.listen(3001, () =>
    console.log('UTN API service listening on port 3001!')
);
