import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ScatterChart from '../ScatterChart/ScatterChart';
import BarChart from '../BarChart/BarChart';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import LogOutButton from '../LogOutButton/LogOutButton';

function ProfilePage() {
    // get the user's info from the store
    const user = useSelector((store) => store.user);
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // set history hook as a variable for use
    const history = useHistory();
    // grab user summary stats from store
    const userStats = useSelector(store => store.userStats);
    // grab the user's courses from store
    const userCourses = useSelector(store => store.userCourses);
    // define a state variable for the user's course selection
    let [courseSelect, setCourseSelect] = useState(0);
    // define a function to handle change of a user course selection
    function handleCourseSelection(event) {
        event.preventDefault();
    }

    console.log('User summary stats are: ', userStats);
    console.log('Course selection is: ', courseSelect);

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_SUMMARY' });
        dispatch({ type: 'FETCH_USER_COURSES' });
    }, [dispatch, courseSelect])
    // JSX code to render to the DOM
    return (
        <Box sx={{ pb: 7, backgroundColor: '#F5FBEF' }}>
            <Typography
                align='center'
                sx = {{pt:2, mt:0.2}}
                variant = 'h4'>
                Welcome {user.username}!
            </Typography>
            {/* <Typography
                sx = {{mx:2, my:1}}
                variant = 'body1'>
                Welcome, {user.username}
            </Typography> */}
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box >
                    <Typography
                        sx = {{mx:2, my:1}}
                        variant = 'h6'>
                        Total Rounds: {userStats.total_rounds}
                    </Typography>
                    <Typography
                        sx = {{mx:2, my:1}}
                        variant = 'h6'>
                        Courses Played: {userStats.total_courses}
                    </Typography>
  
                </Box>
                <Button
                    variant="contained"
                    sx={{mr:2, my:2}}
                    onClick={() => dispatch({ type: 'LOGOUT' })}>
                        LOG OUT
                </Button>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <FormControl sx={{my:2}}>
                    <InputLabel>Course Selection</InputLabel>
                    <Select
                        value={courseSelect}
                        label="Course Selection"
                        onChange={(e) => setCourseSelect(e.target.value)}
                    >
                        <MenuItem value={0}>
                            View All Courses</MenuItem>
                        {userCourses.map((course) => {
                            return (
                                <MenuItem key={course.id}
                                value={course.id}>
                                    {course.course_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
            
            <BarChart courseID={courseSelect}/>
            <ScatterChart courseID={courseSelect}/>
            <BottomNavBar />

        </Box>
        
    )
}
export default ProfilePage;