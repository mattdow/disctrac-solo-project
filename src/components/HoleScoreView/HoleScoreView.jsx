import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, TextField, Typography, Box, Input } from '@mui/material';


function HoleScoreView() {
    // set UseDispatch hook to a variable
    const dispatch = useDispatch();
    // set UseHistory hook to a variable
    const history = useHistory();
    // set the course id and hole number equal to what is currently in params
    let { course, id } = useParams();
    console.log('React Router course ID is: ', course);
    console.log('React Router hole ID is: ', id);
     
    // grab the active courses array of holes from the Redux store
    const currentCourse = useSelector((store) => store.currentCourse);

    // Using the ID from params, I'll search through the current course array to pick out the correct hole to display
    let activeHole = {};
    function findActiveHole() {
        // loop through the holes in the current course
        for (let hole of currentCourse) {
            // check if the hole number (not hole ID!) matches the params ID
            if (hole.hole_number === Number(id)) {
                activeHole = hole;
            } // end if statement
        } // end of for loop
    } // end of findActiveHole fxn
    findActiveHole();

    // set a local state for the new hole information
    let [newScore, setNewScore] = useState(activeHole.par_score);
    let [newNote, setNewNote] = useState('');
    console.log('Active hole is: ', activeHole);
    console.log('Active par score is: ', activeHole.par_score);
    console.log('newScore is: ', newScore);
    // console.log(newScore);
    // define decreaseScore to decrement 
    // call useEffect to grab the current course from state immediately upon render
    useEffect(() => {
        dispatch({ type: 'FETCH_CURRENT_COURSE', payload: course});
    }, [dispatch]);
   
    return (
        <section className="active-hole-view">
            <Typography variant="h4">
                Hole {activeHole.hole_number} of {currentCourse.length}
            </Typography>
            <Typography variant="h5">
                Par {activeHole.par_score} {activeHole.hole_length} feet
            </Typography>
            <Typography variant="body1">
                Notes
            </Typography>
            <Box className="score-bar" sx={{display: 'flex', justifyContent:'space-around'}}>
                <Button onClick={(e) => {setNewScore(newScore--)}}>-</Button>
                <Input variant="h3"
                        type="number"
                        value={newScore}/>
                {/* <Button onClick={(e) => {setNewScore(newScore++)}}>+</Button> */}
            </Box>
            <TextField variant="outlined" label="Hole Notes"/>

        </section>
    )


} // end of HoleScoreView
export default HoleScoreView;