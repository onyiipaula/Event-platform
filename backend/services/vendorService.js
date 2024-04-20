const { Vendor } = require('../models');

// Create a new vendor
const createVendor = async (name, category, description, contact) => {
    try {
        const existingVendor = await Vendor.findOne({ name });
        if (existingVendor) {
            throw new Error('Vendor with this name already exists');
        }

        const vendor = new Vendor({
            name,
            category,
            description,
            contact
        });

        await vendor.save();
        return vendor;
    } catch (error) {
        throw new Error('Error creating vendor: ' + error.message);
    }
};

// Retrieve all vendors
const getAllVendors = async () => {
    try {
        return await Vendor.find();
    } catch (error) {
        throw new Error('Error fetching vendors: ' + error.message);
    }
};

// Retrieve a single vendor by ID
const getVendorById = async (id) => {
    try {
        return await Vendor.findById(id);
    } catch (error) {
        throw new Error('Error fetching vendor by ID: ' + error.message);
    }
};

// Update a vendor by ID
const updateVendorById = async (id, name, category, description, contact) => {
    try {
        const vendor = await Vendor.findById(id);
        if (!vendor) {
            throw new Error('Vendor not found');
        }

        vendor.name = name;
        vendor.category = category;
        vendor.description = description;
        vendor.contact = contact;

        await vendor.save();
        return vendor;
    } catch (error) {
        throw new Error('Error updating vendor by ID: ' + error.message);
    }
};

// Delete a vendor by ID
const deleteVendorById = async (id) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(id);
        if (!vendor) {
            throw new Error('Vendor not found');
        }
    } catch (error) {
        throw new Error('Error deleting vendor by ID: ' + error.message);
    }
};

module.exports = {
    createVendor,
    getAllVendors,
    getVendorById,
    updateVendorById,
    deleteVendorById
};