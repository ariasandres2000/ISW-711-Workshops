const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professors');

router.get('/', professorController.getProfessors);
router.post('/', professorController.createProfessor);
router.put('/', professorController.updateProfessor);
router.delete('/', professorController.deleteProfessor);

module.exports = router;