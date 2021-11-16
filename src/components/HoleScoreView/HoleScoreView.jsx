import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, TextField, Typography, Box } from '@mui/material';


function HoleScoreView() {
    // set UseDispatch hook to a variable
    const dispatch = useDispatch();
    // set UseHistory hook to a variable
    const history = useHistory();
    // set the hole number equal to what is currently in params
    let { course, id } = useParams();
    console.log('React Router course ID is: ', course);
    console.log('React Router hole ID is: ', id);
    // grab the current course list from the Redux store
    const courses = useSelector((store) => store.courses);
    
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
                <Button>-</Button>
                <Typography variant="h3">{activeHole.par_score}</Typography>
                <Button>+</Button>
            </Box>
            <TextField variant="outlined" label="Hole Notes"/>

        </section>
    )


} // end of HoleScoreView
export default HoleScoreView;