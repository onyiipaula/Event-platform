
const dbConfig = require('../config/db');

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Controller function to create a new message
exports.createMessage = (req, res) => {
    const { content, senderId, receiverId } = req.body;
    pool.query('INSERT INTO messages (content, senderId, receiverId) VALUES (?, ?, ?)', [content, senderId, receiverId], (error, results) => {
        if (error) {
            console.error('Error creating message:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ id: results.insertId, content, senderId, receiverId });
    });
};

// Controller function to get all messages
exports.getAllMessages = (req, res) => {
    pool.query('SELECT * FROM messages', (error, results) => {
        if (error) {
            console.error('Error getting messages:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
};

// Controller function to get a message by ID
exports.getMessageById = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM messages WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error getting message by ID:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json(results[0]);
    });
};

// Controller function to update a message
exports.updateMessage = (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    pool.query('UPDATE messages SET content = ? WHERE id = ?', [content, id], (error, results) => {
        if (error) {
            console.error('Error updating message:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json({ id,content });
    });
};

// Controller function to delete a message
exports.deleteMessage = (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM messages WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error deleting message:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json({ message: 'Message deleted successfully' });
    });
};

module.exports = {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessage,
    deleteMessage
};