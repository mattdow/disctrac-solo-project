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
    // RETURNING "id" gives us back the id of the created round
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

// create a GET router to grab the newest active round when user is adding
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // define the query text
    const queryText = `
        SELECT * FROM rounds
        WHERE rounds.id = $1;
    `;
    pool.query(queryText, [req.params.id])
    .then(result => {
        console.log('New round object: ', result.rows);
        res.send(result.rows[0]);
    }).catch(err => {
        console.log('Error fetching active/new round', err);
    })
})

// create a delete route to delete a user round, double checking to make sure ID matches

router.delete("/:id", rejectUnauthenticated, (req, res) => {
    // define the query text to delete if round ID and user_id is correct
    const queryText = `
        DELETE FROM rounds
        WHERE id = $1
        AND user_id = $2;
    `;
    // define our sanitized parameters
    const values = [Number(req.params.id), req.user.id];
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(204);
        }).catch(err => {
            console.log('Error in round delete:', err);
            res.sendStatus(500);
        })
});

module.exports = router;
