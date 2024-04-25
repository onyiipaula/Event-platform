const express = require('express');
const router = express.Router();
const criteriaController = require('../controllers/criteriaController');

// Location criteria
router.post('/location', criteriaController.setLocationCriteria);

// Past experience criteria
router.post('/experience', criteriaController.setPastExperienceCriteria);

// Category criteria
router.post('/category', criteriaController.setCategoryCriteria);

// Portfolio criteria
router.post('/portfolio', criteriaController.setPortfolioCriteria);

// Quality score criteria
router.post('/quality', criteriaController.setQualityScoreCriteria);

module.exports = router;
