const express = require('express');
const mysql = require('mysql2/promise'); // Using mysql2 promise-based version
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');

dotenv.config();

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check if MySQL connection pool was created successfully
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to EventVet');
});

app.use('/', landingRoutes);
app.use('/api/auth', authRoutes);
app.use('/vendor', vendorRoutes)

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
