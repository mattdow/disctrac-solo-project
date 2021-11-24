import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, TextField, Typography, Box, Input } from '@mui/material';


function HoleScoreView() {
    // set UseDispatch hook to a variable
    const dispatch = useDispatch();
    // set UseHistory hook to a variable
    const history = useHistory();
    // set the course id, hole number, round ID, and holeScore ID equal to what is currently in params
    let { course, id, round } = useParams();
    // grab the active courses array of holes from the Redux store
    const currentCourse = useSelector((store) => store.currentCourse);
    const activeHole = useSelector((store) => store.currentHole);
    // grab any active hole notes for this user and hole
    const holeNotes = useSelector((store) => store.holeNote);
    // grab the active round data from the activeRound reducer
    console.log('Hole notes on HoleScoreView: ', holeNotes);
    const activeRound = useSelector((store) => store.activeRound);
    // if there is no round parameter in the URL, use the active round data
    if (!round) {
        round = activeRound.round_id;
    }
    console.log(round);
    // const activeHoleScore = useSelector((store) => store.selectedHS);
    
    // set a local state for the new hole information
    let [newScore, setNewScore] = useState(activeHole.par_score);
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
            // route to next hole (no holescore in route)
        history.push(`/activeround/${course}/${activeHole.hole_number+1}/${round}`)    
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
        // route to review round 
        history.push(`/review/${round}/${course}`)
    }
    // call useEffect to grab the current course and any hole notes for this user and for this hole from state immediately upon render
    useEffect(() => {
        dispatch({ type: 'FETCH_CURRENT_HOLE', 
            payload: {
                course: course, 
                id: id}});
        dispatch({ type: 'FETCH_CURRENT_COURSE', payload: course});
        dispatch({ type: 'FETCH_HOLE_NOTES', 
            payload: {
                course: course,
                hole: id
        }});
        dispatch({ type: 'FETCH_ACTIVE_ROUND', payload: round})
    }, [dispatch]);

    useEffect(() => {
        setNewScore(activeHole.par_score)
    }, [activeHole, activeRound])

    console.log('ACtive course is: ', course);
    console.log('Active round is: ', round);
    console.log('Active hole is: ', activeHole);
    console.log('Active hole ID is: ', activeHole.id);
    console.log('Active hole number is: ', activeHole.hole_number);

    return (
        <section className="active-hole-view">
            <Typography variant="h4" align="center" sx={{mb:2}}>
                Hole {activeHole.hole_number} of {currentCourse.length}
            </Typography>
            <Typography variant="h5" align="center" sx={{mb:2}}>
               Par {activeHole.par_score} - {activeHole.hole_length} feet 
            </Typography>
            {holeNotes.map((note, i) => {
                return (
                    <Typography key={i} variant="body1">
                        {note.note_content}
                    </Typography>
                )
                })}
            <Box className="score-bar" sx={{display: 'flex', justifyContent:'space-around', my:2}}>
                <Button onClick={decreaseScore}>-</Button>
                <Typography variant="h3">
                            {newScore}
                </Typography>
                <Button onClick={increaseScore}>+</Button>
            </Box>
            <TextField 
                id="outlined-helper-text"
                sx={{mb:2}} 
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