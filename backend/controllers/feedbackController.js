const mysql = require('mysql');
const dbConfig = require('../config/db');

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Controller function to create a new feedback entry
exports.createFeedback = (req, res) => {
    const { title, content, userId } = req.body;
    pool.query('INSERT INTO feedback (title, content, userId) VALUES (?, ?, ?)', [title, content, userId], (error, results) => {
        if (error) {
            console.error('Error creating feedback:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ id: results.insertId, title, content, userId });
    });
};

// Controller function to get all feedback entries
exports.getAllFeedback = (req, res) => {
    pool.query('SELECT * FROM feedback', (error, results) => {
        if (error) {
            console.error('Error getting feedback:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
};

// Controller function to get a feedback entry by ID
exports.getFeedbackById = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM feedback WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error getting feedback by ID:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.json(results[0]);
    });
};

// Controller function to update a feedback entry
exports.updateFeedback = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    pool.query('UPDATE feedback SET title = ?, content = ? WHERE id = ?', [title, content, id], (error, results) => {
        if (error) {
            console.error('Error updating feedback:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message:'Feedback not found' });
        }
        res.json({ id, title, content });
    });
};

// Controller function to delete a feedback entry
exports.deleteFeedback = (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM feedback WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error deleting feedback:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.json({ message: 'Feedback deleted successfully' });
    });
};


