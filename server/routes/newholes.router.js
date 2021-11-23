const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Post all the new holes with the new course ID

router.post('/:courseID', async (req, res) => {
    const courseID = req.params.courseID;
    const holeInfo = req.body;
    console.log('In newholes router, courseID: ', courseID);
    
    // create the same connection for all queries
    const connection = await pool.connect();
    
    try {
        await connection.query('BEGIN');
        const sqlText = `INSERT INTO holes 
            (course_id, hole_number, par_score, hole_length)
            VALUES ($1, $2, $3, $4);`;
        for (let i=1; i<holeInfo.length; i++) {
            console.log('In for loop:', i, courseID, holeInfo[i].hole_num, holeInfo[i].tee_1_par, holeInfo[i].tee_1_len);
            
            await connection.query( sqlText, [courseID, holeInfo[i].hole_num, holeInfo[i].tee_1_par, holeInfo[i].tee_1_len]);
        } // end of for loop
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('Error in posting new holes, rolling back due to', error);
        res.sendStatus(500);
    } finally {
        //running after both success and error
        connection.release();
    }
});

module.exports = router;