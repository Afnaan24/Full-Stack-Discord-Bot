const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoggedMessageSchema = new Schema({
    author: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoggedMessage', LoggedMessageSchema);
