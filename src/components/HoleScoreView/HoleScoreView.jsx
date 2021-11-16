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
    // console.log('React Router course ID is: ', course);
    // console.log('React Router hole ID is: ', id);
     
    // grab the active courses array of holes from the Redux store
    const currentCourse = useSelector((store) => store.currentCourse);

    // grab the active round data from the activeRound reducer
    const activeRound = useSelector((store) => store.activeRound);
     

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
    let [newScore, setNewScore] = useState(3);
    let [newNote, setNewNote] = useState('');
    // define decreaseScore to decrement
    const decreaseScore = (event) => {
        return setNewScore(newScore - 1);
    } 
    // define decreaseScore to decrement
    const increaseScore = (event) => {
        return setNewScore(newScore + 1);
    } 
    // define submitScore to post new holeScore to DB and refresh the holeScore view
    function submitScore() {
        event.preventDefault();
        // define the new holeScore using the state variables
        let newHoleScore = {
            round_id: activeRound.round_id,
            hole_id: currentCourse[id-1].hole_id,
            score: newScore,
            note_content: newNote
        }
        console.log(newHoleScore);
        dispatch({
            type: 'ADD_HOLE_SCORE',
            payload: newHoleScore
        });
        history.push(`activeround/${course}/${id+1}`)
    }
    // call useEffect to grab the current course from state immediately upon render
    useEffect(() => {
        dispatch({ type: 'FETCH_CURRENT_COURSE', payload: course});
        // setNewScore(currentCourse[id-1].par_score);
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
                <Button onClick={decreaseScore}>-</Button>
                <Typography variant="h3">
                    {newScore}
                </Typography>
                <Button onClick={increaseScore}>+</Button>
            </Box>
            <TextField 
                variant="outlined" 
                label="Hole Notes"
                fullWidth
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                        />
            <Button onClick={submitScore}>NEXT</Button>
        </section>
    )


} // end of HoleScoreView
export default HoleScoreView;