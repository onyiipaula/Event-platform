const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const vendorController = require('../controllers/vendorController');

//portfolio items
router.post('/vendors/:vendorId/portfolio',[
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('imageUrl').notEmpty(),
], vendorController.createPortfolioItem)

//retrieve portfolio items
router.get('/vendors/:vendorId/portfolio/',vendorController.getPortfolioItems);

//retrieve by id

router.get('/vendors/:vendorid/portfolio/:portfolioId', vendorController.getPortfolioItemsById);

//update portfolio

router.put('/vendors/:vendorid/portfolio/:portfolioId',[
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('imageUrl').notEmpty()
], vendorController.updateportfolioItemById);

//delete item

router.delete('/vendors/:vendorid/portfolio/:portfolioId', vendorController.deletePortfolioItemById)
//Register a new vendor
router.post('/vendors/register',[
    body('name').notEmpty(),
    body('category').notEmpty(),
    body('description').notEmpty(),
    body('contact').notEmpty(),
    body('website').notEmpty(),
    body('portfolio_link').notEmpty(),
], vendorController.registerVendor)

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