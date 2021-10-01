const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    musicxml: {
        type: String, 
        required: true 
    }
})

module.exports = mongoose.model('ScoreMusicXML', scoreSchema)