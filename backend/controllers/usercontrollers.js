const mysql = require('mysql');
const dbConfig = require('../config/db');


// Create a new user
exports.createUser = (req, res) => {
    const { username, email, password, category, phone_number, address } = req.body;
    const query = `INSERT INTO Users (username, email, password, category, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [username, email, password, category, phone_number, address];

    // Create a connection to the database
    const connection = mysql.createConnection(dbConfig);

    // Execute the query
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(201).json({ message: 'User created successfully', user: { id: result.insertId, username, email, category } });
        }
    });

    // Close the connection
    connection.end();
};

// Retrieve all users
exports.getAllUsers = (req, res) => {
    const query = `SELECT * FROM Users`;

    // Create a connection to the database
    const connection = mysql.createConnection(dbConfig);

    // Execute the query
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(200).json(results);
        }
    });

    // Close the connection
    connection.end();
};

// Retrieve a single user by ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    const query = `SELECT * FROM Users WHERE id = ?`;
    const values = [userId];

    // Create a connection to the database
    const connection = mysql.createConnection(dbConfig);

    // Execute the query
    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error fetching user by ID:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(results[0]);
        }
    });

    // Close the connection
    connection.end();
};

// Update a user by ID
exports.updateUserById = (req, res) => {
    const userId = req.params.id;
    const { username, email, category, phone_number, address } = req.body;
    const query = `UPDATE Users SET username = ?, email = ?, category = ?, phone_number = ?, address = ? WHERE id = ?`;
    const values = [username, email, category, phone_number, address, userId];

    // Create a connection to the database
    const connection = mysql.createConnection(dbConfig);

    // Execute the query
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User updated successfully' });
        }
    });

    // Close the connection
    connection.end();
};

// Delete a user by ID
exports.deleteUserById = (req, res) => {
    const userId = req.params.id;
    const query = `DELETE FROM Users WHERE id = ?`;
    const values = [userId];

    // Create a connection to the database
    const connection = mysql.createConnection(dbConfig);

    // Execute the query
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User deleted successfully' });
        }
    });

    // Close the connection
    connection.end();
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};