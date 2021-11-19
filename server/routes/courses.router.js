const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get all courses in the database

router.get('/', (req, res) => {
    console.log('Course list GET request');
    let query = `SELECT course_name, COUNT(holes.id)      AS     total_holes, SUM(holes.par_score) AS total_par 
        FROM courses JOIN holes ON courses.id = holes.course_id GROUP BY course_name`;
    pool.query(query).then( result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);        
    })
});

// Get the course hole data for the course selected by user click

router.get('/:id', (req, res) => {
    console.log('Current Course GET Request', req.params.id);
    // assign the search parameter to the id parameter from fetchCurrentCourse
    const values = [req.params.id];
    //query the database to return a list of the hole info for the selected course
    const courseQuery = `SELECT holes.id, holes.hole_number, holes.par_score, holes.hole_length FROM holes
    JOIN courses ON courses.id = holes.course_id
    WHERE courses.id = $1;`;
    pool.query(courseQuery, values)
        .then(response => {
            // this will return an array of objects for the selected course
            res.send(response.rows)
        }).catch(err => {
            console.log('Error on selected course GET', err);
            res.sendStatus(500);
        })
})
module.exports = router;