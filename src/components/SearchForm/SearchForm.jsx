import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Paper, Grid, TextField, Typography } from '@mui/material';

function SearchForm() {
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
     // set history hook as a variable for use
    const history = useHistory();
    // set local state for a search term
    const [searchTerm, setSearchTerm] = useState('');
    // define a function to fetch search results on submission
    function submitSearch() {
        console.log('In submit search for term: ', searchTerm);
        dispatch( {type: 'FETCH_COURSE_SEARCH', payload: {
            name: searchTerm
        }});
        history.push('/search_results');
    }


    return (
        <Paper>
            <Typography variant="h3">Search Courses</Typography>
            <TextField
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                label="Enter Part of Course Name"
            />
            <Button
                onClick={submitSearch}>
                Search
            </Button> 
        </Paper>
        
    )
}

export default SearchForm;