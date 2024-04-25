const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const vendorController = require('../controllers/vendorsController');





// Register a new vendor
router.post('vendors/register', [
    body('name').notEmpty(),
    body('category').notEmpty(),
    body('description').notEmpty(),
    body('contact').notEmpty(),
    body('website').notEmpty(),
    body('portfolio_link').notEmpty(),
], vendorController.registerVendor);

// Submit vendor information
router.post('/info', vendorController.submitVendorInfo);

// Create a new vendor
/*router.post('/', [
    body('name').notEmpty(),
    body('category').notEmpty(),
    body('description').notEmpty(),
    body('contact').notEmpty(),
    body('website').notEmpty(),
    body('portfolio_link').notEmpty(),
], vendorController.createVendor);*/

// Retrieve all vendors
router.get('/', vendorController.getAllVendors);

// Retrieve a single vendor by ID
router.get('/:id', vendorController.getVendorById);

// Update a vendor by ID
router.put('/:id', [
    body('name').notEmpty(),
    body('category').notEmpty(),
    body('description').notEmpty(),
    body('contact').notEmpty(),
    body('website').notEmpty(),
    body('portfolio_link').notEmpty(),
], vendorController.updateVendorById);

// Delete a vendor by ID
router.delete('/:id', vendorController.deleteVendorById);

module.exports = router;
