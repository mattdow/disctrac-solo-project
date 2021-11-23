const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Grab the hole information for a given course ID from DGCR

router.get('/:courseID', (req, res) => {
    console.log('DGCR req.params: ', req.params.courseID);
    console.log('Signature is: ', process.env.HOLE_INFO_SIGNATURE);
    console.log('API key is: ', process.env.DGCR_API_KEY);
    axios.get(`http://www.dgcoursereview.com/api_test/?key=${process.env.DGCR_API_KEY}&sig=${process.env.HOLE_INFO_SIGNATURE}&mode=holeinfo&id=${req.params.courseID}`)
    .then((response) => {
        console.log('response is', response.data);
        res.send(response.data)    
    }).catch((error) => {
        console.log('Error in DGCR hole info search', error);
    })
});

module.exports = router;