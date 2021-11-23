import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Paper, Grid, TextField, Typography } from '@mui/material';
import SearchForm from '../SearchForm/SearchForm';
import SearchCourseList from '../SearchCourseList/SearchCourseList';


function SearchCourse() {
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // set history hook as a variable for use
    const history = useHistory();
    // grab the array of search results from Redux

    // const searchResults = useSelector(store => store.SearchCourse);
        
    const [searchTerm, setSearchTerm] = useState('');

    function submitSearch() {
        console.log('In submit search for term: ', searchTerm);
        // searchResults = axios.get(`/api/coursesearch/${searchTerm}`);
        // dispatch( {type: 'FETCH_COURSE_SEARCH', payload: {
        //     name: searchTerm
        // }});
        history.push(`/search_results/${searchTerm}`);
    }

    // call useEffect hook to populate searchResults with results
     useEffect(() => {
        dispatch( {type: 'FETCH_COURSE_SEARCH', payload: {
            name: searchTerm
        }});
    }, [dispatch])//
    return (
        <>
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
            {/* <SearchForm /> */}
        </>

    )
} // end of SearchCourse
export default SearchCourse;