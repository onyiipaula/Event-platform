const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback');

// Create new feedback entry
router.post('/', feedbackController.createFeedback);

// Get all feedback entries
router.get('/', feedbackController.getAllFeedback);

// Get feedback entry by ID
router.get('/:id', feedbackController.getFeedbackById);

// Update feedback entry
router.put('/:id', feedbackController.updateFeedback);

// Delete feedback entry
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;