const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:course/:id', rejectUnauthenticated, (req, res) => {
    console.log('In GET route for current hole for course and HN', req.params.course, req.params.id);
    const values = [req.params.course, req.params.id];
    const queryText = `SELECT * from holes
    WHERE holes.course_id = $1 AND holes.hole_number = $2;`;
    pool.query(queryText, values)
        .then(response => {
            res.send(response.rows[0])
        }).catch(err => {
            console.log('Error on currentHole GET', err);
            res.sendStatus(500);
        })
})

module.exports = router;