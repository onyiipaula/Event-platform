const db = require('../config/db');

// Register new vendor
const registerVendor = async (req, res) => {
    try {
        const { name, category, description, contact, website, portfolio_Link } = req.body;

        const newVendorQuery = `
            INSERT INTO Vendors (name, category, description, contact, website, portfolio_Link)
            VALUES (?, ?, ?, ?, ?, ?)`;
        await db.query(newVendorQuery, [name, category, description, contact, website, portfolio_Link]);

        res.status(201).json({ message: 'Vendor registered successfully' });
    } catch (error) {
        console.error('Error registering vendor:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Submit vendor information
const submitVendorInfo = async (req, res) => {
    try {
        const { yearsOfExperience, location, portfolio } = req.body;

        const newVendorQuery = `
            INSERT INTO Vendors (years_of_experience, location, portfolio)
            VALUES (?, ?, ?)`;
        await db.query(newVendorQuery, [yearsOfExperience, location, portfolio]);

        res.status(201).json({ message: 'Submitted successfully' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Retrieve all vendors
const getAllVendors = (req, res) => {
    const sql = 'SELECT * FROM Vendors';
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
    const sql = 'SELECT * FROM Vendors WHERE id = ?';

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
    const { name, category, description, contact, website, portfolioLink } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Vendors SET name = ?, category = ?, description = ?, contact = ?, website = ?, portfolio_Link = ? WHERE id = ?';
    const values = [name, category, description, contact, website, portfolioLink, id];

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
    const sql = 'DELETE FROM Vendors WHERE id = ?';

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
    registerVendor,
    submitVendorInfo,
    getAllVendors,
    getVendorById,
    updateVendorById,
    deleteVendorById
};