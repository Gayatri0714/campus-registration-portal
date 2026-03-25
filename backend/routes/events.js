const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
    try {
        const [events] = await db.query('SELECT * FROM Events ORDER BY date ASC');
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a single event details
router.get('/:id', async (req, res) => {
    try {
        const [events] = await db.query('SELECT * FROM Events WHERE id = ?', [req.params.id]);
        if (events.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(events[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get events registered by a user
router.get('/user/registered', authMiddleware(['student', 'admin']), async (req, res) => {
    try {
        const query = `
            SELECT e.*, r.registered_at, r.id as registration_id 
            FROM Events e 
            JOIN Registrations r ON e.id = r.event_id 
            WHERE r.user_id = ? 
            ORDER BY e.date ASC
        `;
        const [registeredEvents] = await db.query(query, [req.user.id]);
        res.json(registeredEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Register for an event
router.post('/:id/register', authMiddleware(['student', 'admin']), async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user.id;
        const { phone, paymentMethod } = req.body;

        if (!phone || !paymentMethod) {
            return res.status(400).json({ message: 'Phone number and payment details are required.' });
        }

        const transactionId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        const [events] = await db.query('SELECT * FROM Events WHERE id = ?', [eventId]);
        if (events.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await db.query(
            'INSERT INTO Registrations (user_id, event_id, phone, payment_method, transaction_id) VALUES (?, ?, ?, ?, ?)', 
            [userId, eventId, phone, paymentMethod, transactionId]
        );
        res.status(201).json({ message: `Successfully registered and payment processed! Your Transaction ID is: ${transactionId}` });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'You are already registered for this event. Payment aborted.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Unregister from an event
router.delete('/:id/unregister', authMiddleware(['student', 'admin']), async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user.id;

        const [result] = await db.query('DELETE FROM Registrations WHERE user_id = ? AND event_id = ?', [userId, eventId]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Registration not found' });
        }
        
        res.json({ message: 'Successfully unregistered from event' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
