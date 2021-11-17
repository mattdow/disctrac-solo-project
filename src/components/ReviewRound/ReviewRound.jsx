import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, TextField, Typography, Box, Input } from '@mui/material';
import axios from 'axios';

function ReviewRound() {
    // set the round ID equal to what is currently in params
    let { round } = useParams();
    console.log(round);
    // define dispatch fxn as a variable
    const dispatch = useDispatch();
    // Grab the hole score info from the Redux store
    const holeScores = useSelector((store) => store.holeScore)
    
    console.log(holeScores);
    
    // grab the hole and score information for the round ID from the DB
    
    // Grab the hole scores and other info from the round 
    useEffect(() => {
        dispatch({ type: 'FETCH_HOLE_SCORES', payload: round })
    }, [])
    return (
        <Typography>Review Round: {round}</Typography>
    )

}
export default ReviewRound;