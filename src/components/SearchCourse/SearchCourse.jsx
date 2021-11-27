import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Paper, Grid, TextField, Typography, Box } from '@mui/material';
import BottomNavBar from '../BottomNavBar/BottomNavBar';



function SearchCourse() {
    // set history hook as a variable for use
    const history = useHistory();
        
    const [searchTerm, setSearchTerm] = useState('');

    function submitSearch() {
        console.log('In submit search for term: ', searchTerm);
        history.push(`/search_results/${searchTerm}`);
    }

    return (
        <Box sx={{ pb: 7 }}>
            <Paper>
                <Typography variant="h3">Search Courses</Typography>
                <Typography variant="h6">
                    From dgcoursereview.com
                </Typography>
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
            <BottomNavBar />
        </Box>

    )
} // end of SearchCourse
export default SearchCourse;