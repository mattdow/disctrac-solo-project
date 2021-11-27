import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Paper, Grid, TextField, Typography } from '@mui/material';
import SearchCourseItem from '../SearchCourseItem/SearchCourseItem';
import BottomNavBar from '../BottomNavBar/BottomNavBar';

function SearchCourseList() {
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // set history hook as a variable for use
    const history = useHistory();
    // grab the results from the user search 
    const searchResults = useSelector(store => store.courseSearch);
    // grab the searchTerm from router params
    let searchTerm = useParams();

    useEffect(() => {
        dispatch( { type: 'FETCH_COURSE_SEARCH', payload: searchTerm
    });
    }, [dispatch]);
    console.log('In SearchCourseList, searchTerm is:', searchTerm);
    return (
        <Box sx={{ pb: 7 }}>
            <Typography>
                Search Results
            </Typography>
            { 
                searchResults?.map((result) => {
                    console.log('In map of search results', result);
                    return <SearchCourseItem key={result.course_id}     result = {result} />
    
                })}
            <BottomNavBar />
        </Box>
    )
}

export default SearchCourseList;