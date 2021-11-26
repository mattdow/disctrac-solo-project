import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import ScatterChart from '../ScatterChart/ScatterChart';
import BarChart from '../BarChart/BarChart';

function ProfilePage() {
    // get the user's info from the store
    const user = useSelector((store) => store.user);
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // set history hook as a variable for use
    const history = useHistory();
    // grab user summary stats from store
    const userStats = useSelector(store => store.userStats);

    console.log('User summary stats are: ', userStats);



    useEffect(() => {
        dispatch({ type: 'FETCH_USER_SUMMARY' });
    }, [dispatch])
    // JSX code to render to the DOM
    return (
        <Box>
            <Typography
                sx = {{m:2}}
                variant = 'h4'>
                Your Profile
            </Typography>
            <Typography
                sx = {{m:2}}
                variant = 'body1'>
                Welcome, {user.username}
            </Typography>
            <Typography
                sx = {{m:2}}
                variant = 'body1'>
                Total Rounds Played: {userStats.total_rounds}
            </Typography>
            <Typography
                sx = {{m:2}}
                variant = 'body1'>
                Total Courses Played: {userStats.total_courses}
            </Typography>
            <BarChart />
            <ScatterChart />


        </Box>
        
    )
}
export default ProfilePage;