const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const vendorController = require('../controllers/vendorController');

// Create a new vendor
router.post('/vendors', [
    body('name').notEmpty(),
    body('category').notEmpty(),
    body('description').notEmpty(),
    body('contact').notEmpty(),
    body('website').notEmpty(),
    body('portfolio_link').notEmpty()
], vendorController.createVendor);

// Retrieve all vendors
router.get('/vendors', vendorController.getAllVendors);

// Retrieve a single vendor by ID
router.get('/vendors/:id', vendorController.getVendorById);

// Update a vendor by ID
router.put('/vendors/:id', [
    body('name').notEmpty(),
    body('category').notEmpty(),
    body('description').notEmpty(),
    body('contact').notEmpty(),
    body('website').notEmpty(),
    body('portfolio_link').notEmpty()
], vendorController.updateVendorById);

// Delete a vendor by ID
router.delete('/vendors/:id', vendorController.deleteVendorById);

module.exports = router;