import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Paper, Grid, TextField, Typography } from '@mui/material';


function SearchCourse() {
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // set history hook as a variable for use
    const history = useHistory();
    // grab the array of search results from Redux

    const searchResults = useSelector(store => store.SearchCourse);
    
    
    const [searchTerm, setSearchTerm] = useState('');

    function submitSearch() {
        console.log('In submit search for term: ', searchTerm);
        dispatch( {type: 'FETCH_COURSE_SEARCH', payload: {
            name: searchTerm
        }});
    }
    console.log('Course search results: ', searchResults);
    // call useEffect hook to populate searchResults with results
    // useEffect(() => {
    //     // dispatch( {type: 'FETCH_COURSE_SEARCH', payload: {
    //     //     name: searchTerm
    //     // }});
    // }, [dispatch])
    return (
        <Paper>
            <Typography variant="h3">Search Courses</Typography>
            <TextField
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                label="Enter Part of Course Name"
            />
            <Button
                onClick={(event) => {dispatch( {type: 'FETCH_COURSE_SEARCH', payload: {
                    name: searchTerm
                }})}}>
                Search
            </Button>
            <Typography>
                {JSON.stringify(searchResults)}
            </Typography>
        </Paper>

    )
} // end of SearchCourse
export default SearchCourse;