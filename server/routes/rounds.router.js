const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get all of the user's rounds

router.get('/', (req, res) => {
    console.log('Rounds GET Request', req.user);
    // Querying for the specific info we need from each round if the Id from the user matches the user_id for the given round.
    let queryText = `SELECT rounds.id, rounds.date_played, courses.id AS courseid, courses.course_name, SUM(hole_scores.score) - SUM(holes.par_score) as total_score FROM hole_scores
    JOIN holes ON hole_scores.hole_id = holes.id
    JOIN rounds ON rounds.id = hole_scores.round_id
    JOIN courses ON rounds.course_id = courses.id
    WHERE rounds.user_id = $1
    GROUP BY rounds.id, courseid, courses.course_name
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
// creating a post route to create a new round
router.post('/', (req, res) => {
    console.log(req.body);
    // RETURNING "id" gives us back the id of the created movie
    const startRoundQuery = `
    INSERT INTO rounds ("user_id", "course_id", "date_played")
    VALUES ($1, $2, CURRENT_DATE)
    RETURNING "id";`;
    const values = [req.body.user, req.body.course];
    //query the database to create the movie
    pool.query(startRoundQuery, values)
    .then(result => {
        // make sure we get an ID as a result
        console.log('New Round ID: ', result.rows[0].id);
        const newRoundID = result.rows[0].id;
        res.send({round_id: newRoundID});
    }).catch(err => {
        console.log('Error starting new round', err);
        res.sendStatus(500);  
    })
})

module.exports = router;
