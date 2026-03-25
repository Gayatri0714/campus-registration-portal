const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware(['admin']));

router.post('/events', async (req, res) => {
    try {
        const { title, description, date, venue } = req.body;
        if (!title || !description || !date || !venue) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const [result] = await db.query(
            'INSERT INTO Events (title, description, date, venue) VALUES (?, ?, ?, ?)',
            [title, description, date, venue]
        );
        res.status(201).json({ message: 'Event created', eventId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/events/:id', async (req, res) => {
    try {
        const { title, description, date, venue } = req.body;
        if (!title || !description || !date || !venue) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        await db.query(
            'UPDATE Events SET title = ?, description = ?, date = ?, venue = ? WHERE id = ?',
            [title, description, date, venue, req.params.id]
        );
        res.json({ message: 'Event updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/events/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM Events WHERE id = ?', [req.params.id]);
        res.json({ message: 'Event deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/registrations', async (req, res) => {
    try {
        const query = `
            SELECT r.id, r.phone, r.payment_method, r.transaction_id, r.registered_at, u.name as user_name, u.email as user_email, e.title as event_title 
            FROM Registrations r
            JOIN Users u ON r.user_id = u.id
            JOIN Events e ON r.event_id = e.id
            ORDER BY r.registered_at DESC
        `;
        const [registrations] = await db.query(query);
        res.json(registrations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, name, email, role, created_at FROM Users');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM Users WHERE id = ?', [req.params.id]);
        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
