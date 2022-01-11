const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    musicxml: {
        type: String, 
        required: true 
    },
    createdAt: { type: Date, expires: '30d', default: Date.now }
})

module.exports = mongoose.model('ScoreMusicXML', scoreSchema)