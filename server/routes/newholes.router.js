const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Post all the new holes with the new course ID
// Using async/await to make sure each and every hole gets posted if any of them do
router.post('/:courseID', async (req, res) => {
    // grabbing the course ID as a parameter
    const courseID = req.params.courseID;
    // defining an array of hole info that should be sent in the body
    const holeInfo = req.body;
    console.log('In newholes router, courseID and holeInfo ', courseID, holeInfo);
    
    // create the same connection for all queries
    const connection = await pool.connect();
    
    try {
        await connection.query('BEGIN');
        // define the SQL query to add a hole to the DB
        const sqlText = `INSERT INTO holes 
            (course_id, hole_number, par_score, hole_length)
            VALUES ($1, $2, $3, $4);`;
        // loop through all the holes in the array. Starting at index  1 because the first object is course info.
        for (let i=1; i<holeInfo.length; i++) {
            console.log('In for loop:', i, courseID, holeInfo[i].hole_num, holeInfo[i].tee_1_par, holeInfo[i].tee_1_len);
            // make an asynchronous query to the DB to insert the hole info
            await connection.query( sqlText, [courseID, holeInfo[i].hole_num, holeInfo[i].tee_1_par, holeInfo[i].tee_1_len]);
        } // end of for loop
        // if the loop completes successfully, commit the changes
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        // if there's an error somewhere, roll back any additions
        await connection.query('ROLLBACK');
        console.log('Error in posting new holes, rolling back due to', error);
        res.sendStatus(500);
    } finally {
        //running after both success and error: release the connection
        connection.release();
    }
});

module.exports = router;