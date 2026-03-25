const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');

// Route imports
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.json({ status: 'OK', database: 'connected' });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', database: 'disconnected', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
