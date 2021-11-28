import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Paper, TextField, Typography, Box, Input, IconButton, InputLabel, FormControl } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


function HoleScoreView() {
    // set UseDispatch hook to a variable
    const dispatch = useDispatch();
    // set UseHistory hook to a variable
    const history = useHistory();
    // set the course id, hole number, round ID, and holeScore ID equal to what is currently in params
    let { course, id, round, holeScore } = useParams();
    // grab the active courses array of holes from the Redux store
    const currentCourse = useSelector((store) => store.currentCourse);
    // grab any active hole notes for this user and hole
    const holeNotes = useSelector((store) => store.holeNote);
    // grab the active round data from the activeRound reducer
    console.log(holeNotes);
    const activeRound = useSelector((store) => store.activeRound);
    // if there is no round parameter in the URL, use the active round data
    if (!round) {
        round = activeRound.round_id;
    }
    const activeHoleScore = useSelector((store) => store.selectedHS);;
    // Using the ID from params, I'll search through the current course array to pick out the correct hole to display
    let activeHole = {}
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
    
    // create a function to find an active hole note (if any)
    // let activeNote = {}
    // function findActiveNote() {
    //     // loop through the notes in the reducer
    //     for (let note of holeNotes) {
    //         // check if the hole score ID matches active hole score from params
    //         if(note.id === Number(holeScore)) {
    //             activeNote = note;
    //         } // end if statement
    //     }
    // }
    // findActiveNote();
    // console.log('Active note is:', activeNote);
    // set a local state for the new hole information
    let [newScore, setNewScore] = useState(3);
    let [newNote, setNewNote] = useState(activeHoleScore.note_content);
    
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
        // if this is a new hole score, simply add to DB
        // if (!holeScore) {
        //     dispatch({
        //         type: 'ADD_HOLE_SCORE',
        //         payload: newHoleScore
        //     });
        //     // route to next hole (no holescore in route)
        //     history.push(`/activeround/${course}/${activeHole.hole_number+1}/${round}`)
        // // however, if we are editing, PUT to DB instead
        // } else {
            dispatch({
                type: 'CHANGE_HOLE_SCORE',
                payload: newHoleScore
            });
            // route to next hole ()
            history.push(`/editround/${course}/${activeHole.hole_number+1}/${round}/${Number(holeScore) + 1}`)    
    }
    // define reviewRound to submit last hole and go to the Review Round View
    function reviewRound(event) {
        event.preventDefault();
        let newHoleScore = {
            holeScore_id: holeScore,
            round_id: round,
            hole_id: activeHole.id,
            score: newScore,
            note_content: newNote
        }
        console.log(newHoleScore);
        dispatch({
                type: 'CHANGE_HOLE_SCORE',
                payload: newHoleScore
            });
            // route to review round
            history.push(`/review/${round}/${course}`)
    }
    // call useEffect to grab the current course and any hole notes for this user and for this hole from state immediately upon render
    useEffect(() => {
        dispatch({ type: 'FETCH_CURRENT_COURSE', payload: course});
        dispatch({ type: 'FETCH_HOLE_NOTES', 
            payload: {
                course: course,
                hole: id
        }});
        dispatch({ type: 'FETCH_SELECTED_HS', payload: holeScore})
    }, [dispatch]);

    useEffect(() => {
        setNewScore(activeHoleScore.score);
        setNewNote(activeHoleScore.note_content);
    }, [activeHoleScore] )

    console.log('ACtive course is: ', course);
    console.log('Active round is: ', round);
    console.log('Active hole is: ', activeHole);
    console.log('activeHoleScore is: ', activeHoleScore);
    console.log('Active hole ID is: ', activeHoleScore.id);
    console.log('Active hole number is: ', activeHoleScore.hole_number);
    console.log('Active holescore ID is: ', Number(holeScore));

    console.log('Checking active hole note: ', activeHoleScore.note_content);
    return (
        <Box sx={{ pb: 7, backgroundColor: '#F5FBEF'}}>
            <Typography variant="h4" align="center" 
                sx={{pt:2, mt:0.2, mb:1}}>
                Hole {activeHole.hole_number} of {currentCourse.length}
            </Typography>
            <Typography variant="h6" align="center" 
                fontStyle="italic" sx={{mb:2}}>
               Par {activeHole.par_score} - {activeHole.hole_length} feet 
            </Typography>
            <Paper sx={{mx:1}}>
                <Typography sx={{pt:1, fontWeight:'bold'}}
                    align="center"
                    >Previous Hole Notes</Typography>
                <Box sx={{pb:3}}>
                {holeNotes.map((note, i) => {
                    return (
                        <Typography sx={{ml:2, mb:0.5}}key={i} variant="body1">
                            {note.note_content}
                        </Typography>
                    )
                    })}
                </Box>
            </Paper>
            <Box className="score-bar" sx={{display: 'flex', justifyContent:'center', my:3}}>
                <IconButton onClick={decreaseScore}
                            color="success"
                            aria-label="Decrease Score"
                >
                    <RemoveCircleOutlineIcon fontSize="large"/>
                </IconButton>
                <Typography variant="h3"
                            sx={{ mx: 5 }}>
                            {newScore}
                </Typography>
                <IconButton onClick={increaseScore}
                            color="error"
                            aria-label="Increase Score"
                >
                    <AddCircleOutlineIcon fontSize="large"/>
                </IconButton>
            </Box>
            <Paper display='flex' justifyContent='center'>
                <FormControl fullWidth sx={{ m:2 }} >
                    {!activeHole.noteContent && <InputLabel>New Hole Notes:</InputLabel>}
                    <Input 
                        onChange={(e) => setNewNote(e.target.value)}
                        value={newNote}
                    />
                </FormControl> 
            </Paper>
            <Box sx={{mt:2}} display='flex'     justifyContent='space-around'>
                <Button onClick={reviewRound}
                    variant="contained"
                    color="secondary"
                    >REVIEW ROUND</Button>
                {(activeHole.hole_number < currentCourse.length) && <Button sx={{mx:1}} onClick={submitScore}
                    variant="contained">NEXT HOLE</Button>} 
                
            </Box>            
        </Box>
    )
} // end of HoleScoreView
export default HoleScoreView;