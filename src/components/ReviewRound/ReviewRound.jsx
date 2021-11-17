import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, TextField, Typography, Box, Input } from '@mui/material';

function ReviewRoundView(){
    // set the round ID equal to what is currently in params
    let { round } = useParams();

    return (
        <h1>Review Round: {round}</h1>
    )

}
export default ReviewRound;