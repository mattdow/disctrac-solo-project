import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, TextField, Typography } from '@mui/material';


function HoleScoreView() {
    const dispatch = useDispatch();
    // set the hole number equal to what is currently in params
    let { course, id } = useParams();
    console.log('React Router course ID is: ', course );
    console.log('React Router hole ID is: ' id);
    // grab the current course from the Redux store
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
    // call useEffect to grab the current course from state
    // useEffect(() => {
    //     dispatch({ type: 'FETCH_CURRENT_COURSE'});
    // }, [dispatch]);
   
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
            <div className="score-bar">
                <Button>-</Button>
                <Typography >{activeHole.par_score}</Typography>
                <Button>+</Button>
            </div>
            <TextField variant="outlined" label="Hole Notes"/>

        </section>
    )


} // end of HoleScoreView
export default HoleScoreView;