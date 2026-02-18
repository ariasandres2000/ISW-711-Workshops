const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    nombre: {
        required: true,
        type: String
    },
    codigo: {
        required: true,
        type: String,
        unique: true
    },
    descripcion: {
        required: true,
        type: String
    },
    professorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor',
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);