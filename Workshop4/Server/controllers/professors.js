const Professor = require('../models/professor');

exports.getProfessors = async (req, res) => {
    const professors = await Professor.find();
    res.json(professors);
};

exports.createProfessor = async (req, res) => {
    const professor = new Professor(req.body);
    await professor.save();
    res.status(201).json(professor);
};

exports.updateProfessor = async (req, res) => {
    const updated = await Professor.findByIdAndUpdate(
        req.query.id,
        req.body,
        { new: true }
    );
    res.json(updated);
};

exports.deleteProfessor = async (req, res) => {
    await Professor.findByIdAndDelete(req.query.id);
    res.json({ message: "Deleted" });
};