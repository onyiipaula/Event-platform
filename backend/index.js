const express = require('express');
const mysql = require('mysql2/promise');
const authRoutes = require('./routes/auth');
const vendorRoutes = require('./routes/vendorRoutes');
const criteriaRoutes = require('./routes/criteriaRoutes');
const credibilityRoutes = require('./routes/credibilityRoutes');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release();
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to EventVet');
});

app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/criteria', criteriaRoutes);
app.use('/api/credibility', credibilityRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
