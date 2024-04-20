const { validationResult } = require('express-validator');
const { connection } = require('../config/db');

// Function to submit survey
const submitSurvey = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId, surveyData } = req.body;

        // Insert survey data into the database
        const query = 'INSERT INTO surveys (user_id, survey_data) VALUES (?, ?)';
        const values = [userId, JSON.stringify(surveyData)];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Error in submitting survey:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json({ message: 'Survey submitted successfully' });
        });
    } catch (error) {
        console.error('Error in submitting survey:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    submitSurvey
};