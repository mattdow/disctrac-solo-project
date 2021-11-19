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
        WHERE hole_scores.round_id=$1
        ORDER BY holes.hole_number;
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
//GET hole notes for the user at the correct user, course, and hole
router.get('/:course/:hole', rejectUnauthenticated, (req, res) => {
    console.log('In GET route for hole notes course ID and hole number: ', req.params.course, req.params.hole);
    // define a query string to grab an array of entered hole notes
    const queryText = `SELECT hole_scores.id, hole_scores.note_content 
                        FROM hole_scores
                        JOIN rounds ON hole_scores.round_id = rounds.id
                        JOIN holes ON hole_scores.hole_id = holes.id
                        WHERE rounds.user_id = $1 AND holes.course_id = $2 
                        AND holes.hole_number = $3
                        AND hole_scores.note_content IS NOT NULL;`
    // define an array of our sanitized parameters
    const values = [req.user.id, req.params.course, req.params.hole];
    pool.query(queryText, values)
        .then(response => {
            // return an array of objects with the note content
            res.send(response.rows)
        }).catch(err => {
            console.log('Error on hole note GET', err);
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

// PUT a new hole score
router.put('/', rejectUnauthenticated, (req,res) => {
    console.log('CHANGE new HoleScore:', req.body);
    // define the SQL query to change the hole score
    const changeScoreQuery = `
    UPDATE hole_scores
    SET score = $1, note_content = $2
    WHERE id = $3;`
    const values = [req.body.score, req.body.note_content, req.body.holeScore_id];
    pool.query(changeScoreQuery, values)
    .then((result) => {
        console.log('PUT holeScore SUCCESS');
        res.sendStatus(201);        
    }).catch((error) => {
        console.log('PUT holeScore ERROR', error);
        res.sendStatus(500);        
    })
})

module.exports = router;