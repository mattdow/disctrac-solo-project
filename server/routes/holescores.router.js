const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET hole scores and hole info for a given round
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('In GET route for hole scores with round ID', req.params.id);
    // assign the search parameter to the ID parameter from ReviewRound view request
    const values = [req.params.id];
    // query the DB to provide scores and hole info we need for the hole score cards
    const queryText = `SELECT hole_scores.id, holes.hole_number, 
        hole_scores.score, holes.par_score FROM hole_scores
        JOIN holes on hole_scores.hole_id = holes.id
        WHERE hole_scores.round_id=$1;
        `;
    pool.query(queryText, values)
        .then(response => {
            //return an array of objects with the hole score info
            res.send(response.rows)
        }).catch(err => {
            console.log('Error on holescore GET', err);
            res.sendStatus(500);            
        })    
})



// POST a new hole score
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('POST new HoleScore:', req.body);
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