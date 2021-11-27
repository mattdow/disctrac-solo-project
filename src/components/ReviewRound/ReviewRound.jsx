import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, TextField, Typography, Box, Input, Grid } from '@mui/material';
import HoleScoreItem from '../HoleScoreItem/HoleScoreItem';
import BottomNavBar from '../BottomNavBar/BottomNavBar';

function ReviewRound() {
    // set the round ID equal to what is currently in params
    let { round, course } = useParams();
    console.log(round, course);
    // define dispatch fxn as a variable
    const dispatch = useDispatch();
    // Grab the hole score info from the Redux store
    const holeScores = useSelector((store) => store.holeScore);
    // Grab the active round info from the Redux store
    const activeRound = useSelector((store) => store.activeRound);
    // Calculate the total score of the round from the hole score data
    const totalScore = holeScores.map(score => score.score).reduce(sumReducer, 0) - holeScores.map(score => score.par_score).reduce(sumReducer, 0);
    // define a quick function for the 
    function sumReducer(sum, val) {
        return sum + val;
    }
    console.log(totalScore);
    console.log(holeScores);

    // define a function to add a '+' to any score that is above zero
    const convertScore = (scoreString) => {
        if (Number(scoreString) > 0) {
            return ('+' + scoreString)
        } else if (Number(scoreString) === 0) {
            return ('Even Par');
        } else {
            return scoreString;
        }
    }

    let convertedScore = convertScore(totalScore);
    
    // Grab the hole scores and other info from the round 
    useEffect(() => {
        dispatch({ type: 'FETCH_HOLE_SCORES', payload: round });
    }, [])
    return (
        <Box sx={{ pb: 7 }}>
            <Typography
                sx = {{m:2}}
                variant = 'h4'>Review Your Round</Typography>
            <Typography
                sx = {{m:2}}
                variant = 'h4'>Total Score: {convertedScore} </Typography>
            <Grid container className="hole-score-list">
                {holeScores.map(score => {
                    return (
                        <Grid key={score.id} item xs={12} lg={12}>
                            <HoleScoreItem  
                                score={score} 
                                course={course}
                                round={round} />
                        </Grid>
                    )
                })}
            </Grid>
            <BottomNavBar />
        </Box>
    )

}
export default ReviewRound;