const mysql = require('mysql2');
const db = require('../config/db');

// Create a new vendor
const createVendor = (req, res) => {
    const { name, category, description, contact, website, portfolio_link } = req.body;
    const sql = 'INSERT INTO vendors (name, category, description, contact, website, portfolio_link) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, category, description, contact, website, portfolio_link];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating vendor:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(201).json({ message: 'Vendor created successfully', vendor_id: result.insertId });
        }
    });
};

// Retrieve all vendors
const getAllVendors = (req, res) => {
    const sql = 'SELECT * FROM vendors';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching vendors:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
};

// Retrieve a single vendor by ID
const getVendorById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM vendors WHERE id = ?';

    db.query(sql, id, (err, result) => {
        if (err) {
            console.error('Error fetching vendor by ID:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Vendor not found' });
        } else {
            res.json(result[0]);
        }
    });
};

// Update a vendor by ID
const updateVendorById = (req, res) => {
    const { name, category, description, contact, website, portfolio_link } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE vendors SET name = ?, category = ?, description = ?, contact = ?, website = ?, portfolio_link = ? WHERE id = ?';
    const values = [name, category, description, contact, website, portfolio_link, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating vendor by ID:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Vendor not found' });
        } else {
            res.json({ message: 'Vendor updated successfully', vendor_id: id });
        }
    });
};

// Delete a vendor by ID
const deleteVendorById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM vendors WHERE id = ?';

    db.query(sql, id, (err, result) => {
        if (err) {
            console.error('Error deleting vendor by ID:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Vendor not found' });
        } else {
            res.json({ message: 'Vendor deleted successfully' });
        }
    });
};

module.exports = {
    createVendor,
    getAllVendors,
    getVendorById,
    updateVendorById,
    deleteVendorById
};

