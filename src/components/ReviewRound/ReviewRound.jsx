import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, TextField, Typography, Box, Input } from '@mui/material';

function ReviewRoundView() {
    // set the round ID equal to what is currently in params
    console.log('In Review Round');
    let { round } = useParams();
    useEffect();
    return (
        <Typography>Review Round: {round}</Typography>
    )

}
export default ReviewRoundView;