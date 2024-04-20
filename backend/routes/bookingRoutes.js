const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

// Create a new booking
router.post('/bookings', [
    body('user_id').notEmpty(),
    body('vendor_id').notEmpty(),
    body('date').notEmpty(),
    body('service').notEmpty()
], authMiddleware.authenticate, bookingController.createBooking);

// Retrieve all bookings
router.get('/bookings', authMiddleware.authenticate, bookingController.getAllBookings);

// Retrieve a single booking by ID
router.get('/bookings/:id', authMiddleware.authenticate, bookingController.getBookingById);

// Update a booking by ID
router.put('/bookings/:id', [
    body('user_id').notEmpty(),
    body('vendor_id').notEmpty(),
    body('date').notEmpty(),
    body('service').notEmpty()
], authMiddleware.authenticate, bookingController.updateBookingById);

// Delete a booking by ID
router.delete('/bookings/:id', authMiddleware.authenticate, bookingController.deleteBookingById);

module.exports = router;
