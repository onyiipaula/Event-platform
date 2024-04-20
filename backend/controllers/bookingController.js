const { validationResult } = require('express-validator');
const db = require('../config/db');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, vendor_id, date, service } = req.body;

    const sql = 'INSERT INTO bookings (user_id, vendor_id, date, service) VALUES (?, ?, ?, ?)';
    const values = [user_id, vendor_id, date, service];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating booking:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.status(201).json({ message: 'Booking created successfully', bookingId: result.insertId });
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve all bookings
const getAllBookings = async (req, res) => {
  try {
    const sql = 'SELECT * FROM bookings';

    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error retrieving bookings:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.status(200).json({ message: 'All bookings retrieved successfully', bookings: results });
    });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve a single booking by ID
const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const sql = 'SELECT * FROM bookings WHERE id = ?';

    db.query(sql, bookingId, (err, result) => {
      if (err) {
        console.error('Error retrieving booking by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      if (!result[0]) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }
      res.status(200).json({ message: 'Booking retrieved successfully', booking: result[0] });
    });
  } catch (error) {
    console.error('Error retrieving booking by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a booking by ID
const updateBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { user_id, vendor_id, date, service } = req.body;

    const sql = 'UPDATE bookings SET user_id = ?, vendor_id = ?, date = ?, service = ? WHERE id = ?';
    const values = [user_id, vendor_id, date, service, bookingId];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating booking:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.status(200).json({ message: 'Booking updated successfully' });
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a booking by ID
const deleteBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const sql = 'DELETE FROM bookings WHERE id = ?';

    db.query(sql, bookingId, (err, result) => {
      if (err) {
        console.error('Error deleting booking:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.status(200).json({ message: 'Booking deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById
};