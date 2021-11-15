const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get all of the user's rounds

router.get('/', (req, res) => {
    console.log('Rounds GET Request', req.user);
    // Querying for the specific info we need from each round if the Id from the user matches the user_id for the given round.
    let queryText = `SELECT rounds.id, rounds.date_played, 
        courses.course_name, SUM(hole_scores.score) - 
        SUM(holes.par_score) as total_score FROM hole_scores
        JOIN holes ON hole_scores.hole_id = holes.id
        JOIN rounds ON rounds.id = hole_scores.round_id
        JOIN courses ON rounds.course_id = courses.id
        WHERE rounds.user_id = $1
        GROUP BY rounds.id, courses.course_name
        ORDER BY rounds.date_played DESC;`;
    pool
        .query(queryText, [req.user.id])
        .then((result) => {
            console.log(result.rows);
            
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(err);
            res.sendStatus(500);
        });
})

module.exports = router;
