const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Search for DGCR courses by name

router.get('/:searchTerm', (req, res) => {
    console.log('DGCR req.params: ', req.params.searchTerm);
    console.log('Signature is: ', process.env.FIND_NAME_SIGNATURE);
    console.log('API key is: ', process.env.DGCR_API_KEY);
    axios.get(`http://www.dgcoursereview.com/api_test/?key=${process.env.DGCR_API_KEY}&sig=${process.env.FIND_NAME_SIGNATURE}&mode=findname&name=${req.params.searchTerm}`)
    .then((response) => {
        console.log('response is', response.data);
        res.send(response.data);
    }).catch((error) => {
        console.log('Error in DGCR course name search', error);
    })
});

module.exports = router;
    
    
    