const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST a new hole score
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    // define the SQL query to post the new hole score
    const newHoleScoreQuery = `
        INSERT INTO hole_scores (round_id, hole_id, score, note_content)
        VALUES ($1, $2, $3, $4);`;
    const values = [req.body.round_id, req.body.hole_id, req.body.score, req.body.note_content];
    pool.query(newHoleScoreQuery, values)
    .then((result) => {
        console.log('POST newholescore SUCCESS');
        res.sendStatus(201);
    }).catch((error) => {
        console.log('POST newholescore EROR', error);
        res.sendStatus(500);
    })
})

module.exports = router;