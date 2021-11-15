import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import RoundItem from '../RoundItem/RoundItem';


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

    return (
        <>
        <Typography
            sx = {{m:2}}
            variant = 'h2'>Your Rounds</Typography>
        <Grid container className="rounds-list">
            {rounds.map(round => {
                return (
                    <Grid item xs={12} lg={12}>
                        <RoundItem key={round.id} round={round} />
                    </Grid>
                )
            })}
        </Grid>
        </>
        
    )
}





export default RoundsView;