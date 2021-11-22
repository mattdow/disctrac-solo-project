import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Paper, Grid, TextField, Typography } from '@mui/material';


function SearchCourse() {
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // set history hook as a variable for use
    const history = useHistory();
    // grab the array of search results from Redux

    const searchResults = useSelector(store => store.SearchCourse);
    // call useEffect hook to populate searchResults with results
    useEffect(() => {
    }, [])

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Paper>
            <Typography variant="h3">Search Courses</Typography>
            <TextField
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                label="Enter Part of Course Name"
            />
        </Paper>

    )
} // end of SearchCourse
export default SearchCourse;