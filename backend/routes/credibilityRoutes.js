const express = require('express');
const Router = express.Router();
const credibilitycontroller = require('../controllers/credibilityController');

router.post('/recommendations', credibilitycontroller.scoreVendors);




module.exports = router;