const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const messageController = require('../controllers/messagercontroller');

// Create a new message
router.post('/messages', [
    body('content').notEmpty(),
    body('senderId').notEmpty(),
    body('receiverId').notEmpty()
], messageController.createMessage);

// Get all messages
router.get('/messages', messageController.getAllMessages);

// Get a message by ID
router.get('/messages/:id', messageController.getMessageById);

// Update a message
router.put('/messages/:id', [
    body('content').notEmpty()
], messageController.updateMessage);

// Delete a message
router.delete('/messages/:id', messageController.deleteMessage);

module.exports = router;
