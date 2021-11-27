import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button, Box } from '@mui/material';
import RoundItem from '../RoundItem/RoundItem';
import BottomNavBar from '../BottomNavBar/BottomNavBar';


function RoundsView() {
    // get the user's info from the store
    const user = useSelector((store) => store.user);
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // set history hook as a variable for use
    const history = useHistory();
    // grab the array of the user's rounds from the Redux store
    const rounds = useSelector(store => store.rounds);
    // call useEffect hook to populate the list with rounds
    useEffect(() => {
        dispatch({ type: 'FETCH_ROUNDS' });
    }, [dispatch]);

    // define a function to link to courses view
    

    return (
        <Box sx={{ pb: 7 }}>
            <Typography
                sx = {{m:2}}
                variant = 'h4'>Your Rounds
            </Typography>
            <Button variant="outlined"
                    onClick={() => history.push('/courses')}>
                View Courses
            </Button>
            <Grid container className="rounds-list">
                {rounds.map(round => {
                    return (
                        <Grid key={round.id} item xs={12} lg={12}>
                            <RoundItem  round={round} />
                        </Grid>
                    )
                })}
            </Grid>
            <BottomNavBar />
        </Box>
        
    )
}





export default RoundsView;