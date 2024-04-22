const express =require('express');
const router = express.Router();
const {
    handleLocationCriteria, 
    handleExperienceCriteria,
    handleCategoryCriteria,
    handlePortfolioCriteria,
    handleQualityCriteria
} = require('../controllers/criteriaController');

//location criteria
router.post('/location', handleLocationCriteria);
router.post('/experience', handleExperienceCriteria);
router.post('/category', handleCategoryCriteria);
router.post('/portfolio',handlePortfolioCriteria);
router.post('/quality', handleQualityCriteria);


module.exports = router;