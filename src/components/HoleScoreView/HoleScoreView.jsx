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
    let { course, id, round, holeScore } = useParams();
    // grab the active courses array of holes from the Redux store
    const currentCourse = useSelector((store) => store.currentCourse);
    // grab the active round data from the activeRound reducer
    const activeRound = useSelector((store) => store.activeRound);
    // if there is no round parameter in the URL, use the active round data
    if (!round) {
        round = activeRound.round_id;
    }
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
    console.log('ACtive course is: ', course);
    console.log('Active round is: ', round);
    console.log('Active hole is: ', activeHole);
    console.log('Active hole ID is: ', activeHole.id);
    console.log('Active hole number is: ', activeHole.hole_number);
    console.log('Active holescore ID is: ', holeScore);
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
    function submitScore(event) {
        event.preventDefault();
        // define the new holeScore using the state variables
        let newHoleScore = {
            holeScore_id: holeScore,
            round_id: round,
            hole_id: activeHole.id,
            score: newScore,
            note_content: newNote
        }
        console.log(newHoleScore);
        if (!holeScore) {
            dispatch({
                type: 'ADD_HOLE_SCORE',
                payload: newHoleScore
            });
            history.push(`/activeround/${course}/${activeHole.hole_number+1}/${round}`)
        } else {
            dispatch({
                type: 'CHANGE_HOLE_SCORE',
                payload: newHoleScore
            });
            history.push(`/activeround/${course}/${activeHole.hole_number+1}/${round}/${holeScore + 1}`)

        }
        
    }
    // define reviewRound to submit last hole and go to the Review Round View
    function reviewRound(event) {
        event.preventDefault();
        let newHoleScore = {
            round_id: round,
            hole_id: activeHole.id,
            score: newScore,
            note_content: newNote
        }
        console.log(newHoleScore);
        dispatch({
            type: 'ADD_HOLE_SCORE',
            payload: newHoleScore
        });
        history.push(`/review/${round}`)
    }
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
                Par {activeHole.par_score} - {activeHole.hole_length} feet
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
            {(activeHole.hole_number < currentCourse.length) && <Button onClick={submitScore}>NEXT</Button>}
            <Button onClick={reviewRound}
            >REVIEW ROUND</Button>
        </section>
    )


} // end of HoleScoreView
export default HoleScoreView;