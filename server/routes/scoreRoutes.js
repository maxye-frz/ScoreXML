const express = require('express');
const router = express.Router();
const ScoreMusicXML = require('../model/score');

// get all
router.get('/', async (req, res) => {
    try {
        const score = await ScoreMusicXML.find()
        res.json(score);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// get one by id
router.get('/:id', getScore, (req, res) => {
    res.json(res.score);
})

// create one
router.post('/', async (req, res) => {
    const score = new ScoreMusicXML({
        name: req.body.name,
        musicxml: req.body.musicxml
    })
    try {
        const newScore = await score.save()
        res.status(201).json(newScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// delete one by id
router.delete('/:id', getScore, async (req, res) => {
    try {
        await res.score.remove()
        res.json({ message: 'Deleted score' })
    } catch (err) {
        res.status(500),json({ message: err.message })
    }

})

// helper function for getting score
async function getScore(req, res, next) {
    let score;
    try {
        score = await ScoreMusicXML.findById(req.params.id);
        if (score == null) {
            return res.status(404).json({ message: 'Cannot find score' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.score = score;
    next()
}

module.exports = router