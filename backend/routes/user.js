const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/usercontrollers');

// Create a new user
router.post('/', [
    body('username').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
], userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user by ID
router.put('/:id', [
    
    body('username').optional().notEmpty().trim(),
    body('email').optional().isEmail().normalizeEmail(),
    body('password').optional().isLength({ min: 6 })
], userController.updateUserById);


router.delete('/:id', userController.deleteUserById);

module.exports = router;
