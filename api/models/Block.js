const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    prevHash: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Block', blockSchema); 