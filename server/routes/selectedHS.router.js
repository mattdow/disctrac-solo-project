const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET selected holescore information 
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('In GET route for specific hole score with ID', req.params.id);
    // assign the sanitized parameter to the holeScore ID from HoleScoreView
    const values = [req.params.id];
    // query the DB to provide hole scores and hole info we need for HS view
    const queryText = `SELECT hole_scores.id, holes.           hole_number, 
    hole_scores.note_content, hole_scores.score, holes.par_score 
    FROM hole_scores JOIN holes on hole_scores.hole_id = holes.id
    WHERE hole_scores.id=$1;
        `;
    pool.query(queryText, values)
        .then(response => {
            console.log('selHS response rows:', response.rows);
            
            //return the object with Hole Score info
            res.send(response.rows);
        }).catch(err => {
            console.log('Error on selected HS', err);
            res.sendStatus(500);
        })
})

module.exports = router;