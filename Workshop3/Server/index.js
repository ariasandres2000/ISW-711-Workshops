const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Course = require('./models/course');
const Professor = require('./models/professor');

mongoose.connect('mongodb://127.0.0.1:27017/utnapi');
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});


const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: '*'
}));


//routes
//Post
app.post('/course', async (req, res) => {
    try {

        const professor = await Professor.findById(req.body.professorId);

        if (!professor) {
            return res.sendStatus(404);
        }

        const course = new Course({
            nombre: req.body.nombre,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion,
            professorId: req.body.professorId
        });

        const courseCreated = await course.save();

        res.header('Location', `/course?id=${courseCreated._id}`);
        res.status(201).json(courseCreated);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/professor', async (req, res) => {
    const professor = new Professor({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        cedula: req.body.cedula,
        edad: req.body.edad
    });

    try {
        const professorCreated = await professor.save();
        res.status(201).json(professorCreated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get
app.get('/course', async (req, res) => {
    try {

        if (!req.query.id) {
            const data = await Course.find().populate('professorId');
            return res.status(200).json(data);
        }

        const data = await Course.findById(req.query.id).populate('professorId');

        if (!data) {
            return res.sendStatus(404);
        }

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/professor', async (req, res) => {
    try {
        if (!req.query.id) {
            const data = await Professor.find();
            return res.status(200).json(data);
        }

        const data = await Professor.findById(req.query.id);
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//PUT
app.put('/course', async (req, res) => {
    try {

        if (!req.query.id) {
            return res.status(400).json({ message: "Course id is required" });
        }

        const professor = await Professor.findById(req.body.professorId);

        if (!professor) {
            return res.sendStatus(404);
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.query.id,
            {
                nombre: req.body.nombre,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion,
                professorId: req.body.professorId
            },
            { new: true }
        ).populate('professorId');

        if (!updatedCourse) {
            return res.sendStatus(404);
        }

        res.status(200).json(updatedCourse);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/professor', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({ message: "Professor id is required" });
        }

        const updatedProfessor = await Professor.findByIdAndUpdate(
            req.query.id,
            {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                cedula: req.body.cedula,
                edad: req.body.edad
            },
            { new: true }
        );

        if (!updatedProfessor) {
            return res.sendStatus(404);
        }

        res.status(200).json(updatedProfessor);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//DELETE
app.delete('/course', async (req, res) => {
    try {

        if (!req.query.id) {
            return res.status(400).json({ message: "Course id is required" });
        }

        const deletedCourse = await Course.findByIdAndDelete(req.query.id);

        if (!deletedCourse) {
            return res.sendStatus(404);
        }

        res.status(200).json({ message: "Course deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/professor', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({ message: "Professor id is required" });
        }

        const deletedProfessor = await Professor.findByIdAndDelete(req.query.id);

        if (!deletedProfessor) {
            return res.sendStatus(404);
        }

        res.status(200).json({ message: "Professor deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//start the app
app.listen(3001, () => console.log(`UTN API service listening on port 3001!`))
