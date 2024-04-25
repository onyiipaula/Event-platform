const Vendor = require('../models/vendormodel');

// Retrieve vendor information
const getVendorInfo = async (req, res) => {
    try {
        const vendors = await Vendor.findAll();
        res.status(200).json(vendors);
    } catch (error) {
        console.error('Error retrieving vendor information:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Calculate credibility score for a vendor
const calculateCredibilityScore = (vendor, criteria) => {
    let totalScore = 0;

    // If vendor has a portfolio, assign full score
    if (vendor.portfolio) {
        totalScore += criteria.weights.portfolio;
    }

    // Assign points based on years of experience
    totalScore += Math.min(vendor.yearsOfExperience, criteria.weights.maxYearsOfExperience);

    // Check if vendor's category matches location criterion
    if (criteria.location.includes(vendor.category)) {
        totalScore += criteria.weights.category;
    }

    return totalScore;
};

// Credibility scoring
const scoreVendors = async (req, res) => {
    try {
        const { location, category } = req.body;

        // Weights for each criterion
        const criteriaWeights = {
            portfolio: 10,
            maxYearsOfExperience: 5,
            location: 8,
            category: 7
        };

        // Retrieve all vendors
        const vendors = await Vendor.findAll();

        // Calculate score for each vendor
        const vendorScores = vendors.map(vendor => ({
            vendorId: vendor.Id,
            name: vendor.name,
            credibilityScore: calculateCredibilityScore(vendor, { weights: criteriaWeights, location, category })
        }));

        // Sort scores in descending order based on credibility score
        vendorScores.sort((a, b) => b.credibilityScore - a.credibilityScore);

        // Return list of vendors with credibility scores
        res.json({ vendorScores });
    } catch (error) {
        console.error('Error scoring vendors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getVendorInfo,
    scoreVendors
};