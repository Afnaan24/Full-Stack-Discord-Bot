const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/discord-bot';

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

module.exports = mongoose;
