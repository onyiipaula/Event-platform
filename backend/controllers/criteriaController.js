const { validationResult } = require('express-validator');

// Controller function to handle location input
const setLocationCriteria = (req, res) => {
    // Extract location criteria from the request body
    const { location } = req.body;

    // Validate location criteria
    if (!location || typeof location !== 'string') {
        return res.status(400).json({ error: 'Location criteria must be a non-empty string' });
    }

    // Return success response
    res.status(200).json({ message: 'Location criteria set successfully', location });
};

// Controller function to handle past experience input
const setPastExperienceCriteria = (req, res) => {
    // Extract past experience criteria from the request body
    const { pastExperience } = req.body;

    // Validate past experience criteria
    if (!pastExperience || typeof pastExperience !== 'string') {
        return res.status(400).json({ error: 'Past experience criteria must be a non-empty string' });
    }

    // Return success response
    res.status(200).json({ message: 'Past experience criteria set successfully', pastExperience });
};

// Controller function to handle category input
const setCategoryCriteria = (req, res) => {
    // Extract category criteria from the request body
    const { category } = req.body;

    // Validate category criteria
    if (!category || typeof category !== 'string') {
        return res.status(400).json({ error: 'Category criteria must be a non-empty string' });
    }

    // Return success response
    res.status(200).json({ message: 'Category criteria set successfully', category });
};

// Controller function to handle portfolio input
const setPortfolioCriteria = (req, res) => {
    // Extract portfolio criteria from the request body
    const { portfolio } = req.body;

    // Validate portfolio criteria
    if (!portfolio || typeof portfolio !== 'string') {
        return res.status(400).json({ error: 'Portfolio criteria must be a non-empty string' });
    }

    // Return success response
    res.status(200).json({ message: 'Portfolio criteria set successfully', portfolio });
};

// Controller function to handle quality score input
const setQualityScoreCriteria = (req, res) => {
    // Extract quality score criteria from the request body
    const { qualityScore } = req.body;

    // Validate quality score criteria
    if (!qualityScore || typeof qualityScore !== 'number') {
        return res.status(400).json({ error: 'Quality score criteria must be a number' });
    }

    // Return success response
    res.status(200).json({ message: 'Quality score criteria set successfully', qualityScore });
};

module.exports = {
    setLocationCriteria,
    setPastExperienceCriteria,
    setCategoryCriteria,
    setPortfolioCriteria,
    setQualityScoreCriteria
};