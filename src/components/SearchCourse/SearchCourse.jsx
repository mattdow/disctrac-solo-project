import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Paper, Grid, TextField, Typography, Box, FormControl, InputLabel, Input } from '@mui/material';
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
        <Box sx={{ pb: 7, backgroundColor: '#F5FBEF' }}>
            <Box>
                <Typography 
                    align = 'center'
                    sx = {{pt:2, mt:0.2}}
                    variant="h4">Search Courses</Typography>
                <Typography
                    align = "center"
                    variant="h6">Via dgcoursereview.com</Typography>
                <Paper display='flex' >
                    <FormControl fullWidth sx={{ m:2 }} variant="standard">
                        <InputLabel>Enter Part of Course Name</InputLabel>
                        <Input 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                    </FormControl>   
                    <Box display='flex' justifyContent='flex-end'>
                        <Button sx={{m:2}}
                            variant="contained"
                            align = 'right'
                            onClick={submitSearch}>
                            Search
                        </Button> 
                    </Box>
                </Paper>
            </Box>
            <BottomNavBar />
        </Box>

    )
} // end of SearchCourse
export default SearchCourse;