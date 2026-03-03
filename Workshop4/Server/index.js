const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

const professorRoutes = require('./routes/professors');
const courseRoutes = require('./routes/courses');

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

// Routes
app.use('/professor', professorRoutes);
app.use('/course', courseRoutes);

// Start server
app.listen(3001, () =>
    console.log('UTN API service listening on port 3001!')
);
