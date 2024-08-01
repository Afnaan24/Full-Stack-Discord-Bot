const express = require('express');
const mongoose = require('./database');
const path = require('path');
const LoggedMessage = require('./models/LoggedMessage');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build'))); // Serve React static files

app.get('/api/loggedmessages', async (req, res) => {
    try {
        const messages = await LoggedMessage.find();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/loggedmessages/:id', async (req, res) => {
    try {
        console.log('Attempting to delete message with ID:', req.params.id);
        const message = await LoggedMessage.findById(req.params.id);
        if (!message) {
            console.error('Message not found:', req.params.id);
            return res.status(404).json({ message: 'Message not found' });
        }

        await message.remove();
        console.log('Deleted message with ID:', req.params.id);
        res.json({ message: 'Deleted message' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ message: error.message });
    }
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
