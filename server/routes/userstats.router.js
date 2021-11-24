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
            console.log('User rounds router response:', response.rows);
            res.send(response.rows);
        }).catch(err => {
            console.log('Error on user rounds', err);
            res.sendStatus(500);
        })
})

module.exports = router;