const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET user total rounds
router.get('/rounds', rejectUnauthenticated, (req, res) => {
    console.log('In get route for total user rounds', req.user.id);
    // define DB query text to extract total rounds played for user
    const queryText = `SELECT user_id, COUNT(rounds.id) AS total_rounds,
                    COUNT(DISTINCT rounds.course_id) AS total_courses
                    FROM rounds
                    WHERE user_id = $1
                    GROUP BY user_id;`;
    
    pool.query(queryText, [req.user.id])
        .then(response => {
            console.log('User rounds router response:', response.rows[0]);
            res.send(response.rows[0]);
        }).catch(err => {
            console.log('Error on user rounds', err);
            res.sendStatus(500);
        })
})

router.get('/holescores/', rejectUnauthenticated, (req, res) => {
    console.log('In GET route for user hole scores', req.user.id);
    // define DB query text to extract number of holes with various scores to par
    const queryText = `
        SELECT (hole_scores.score - holes.par_score) AS scores_to_par,
        COUNT(hole_scores.id)
        FROM hole_scores JOIN holes ON holes.id = hole_scores.hole_id
        JOIN rounds ON rounds.id = hole_scores.round_id
        WHERE rounds.user_id = $1
        GROUP BY scores_to_par
        ORDER BY scores_to_par ASC`;
    pool.query(queryText, [req.user.id])
        .then(response => {
            console.log('User holescores router response:', response.rows);
            res.send(response.rows);
        }).catch(err => {
            console.log('Error on user holescores GET', err);
            res.sendStatus(500);
        })
})

router.get('/roundscores/', rejectUnauthenticated, (req, res) => {
    console.log('In GET route for user round scores', req.user.id);
    // define DB query text to extract total round scores
    const queryText = `
        SELECT rounds.id, rounds.date_played::date, 
        SUM(hole_scores.score - holes.par_score) AS total_score_to_par
        FROM hole_scores JOIN rounds ON rounds.id = hole_scores.round_id
        JOIN holes ON holes.id = hole_scores.hole_id
        WHERE rounds.user_id = $1
        GROUP BY rounds.id
        ORDER BY rounds.date_played ASC;`;
    pool.query(queryText, [req.user.id])
        .then(response => {
            console.log('User roundscores router response: ', response.rows);
            res.send(response.rows);           
        }).catch(err => {
            console.log('Error on user roundscores GET', err);
            res.sendStatus(500);            
        })    
})

module.exports = router;