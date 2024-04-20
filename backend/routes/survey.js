const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const surveyController = require('../controllers/surveyController');

// Create a new survey
router.post('/surveys', [
    body('question').notEmpty(),
    body('options').isArray()
], surveyController.createSurvey);

// Get all surveys
router.get('/surveys', surveyController.getAllSurveys);

// Get a survey by ID
router.get('/surveys/:id', surveyController.getSurveyById);

// Update a survey
router.put('/surveys/:id', [
    body('question').notEmpty(),
    body('options').isArray()
], surveyController.updateSurvey);

// Delete a survey
router.delete('/surveys/:id', surveyController.deleteSurvey);

module.exports = router;
