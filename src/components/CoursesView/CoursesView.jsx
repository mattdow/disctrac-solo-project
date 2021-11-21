import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';


// define a function for the component
function CoursesView(){
    // get the user's info from the store
    const user = useSelector((store) => store.user);
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // set history hook as a variable for use
    const history = useHistory();
    // grab the array of courses from the Redux store
    const courses = useSelector(store => store.courses);
    // call useEffect hook to populate the list with rounds
    useEffect(() => {
        dispatch({ type: 'FETCH_COURSES' });
    }, [dispatch]);
    // JSX render code for the component
    return (
        <>
        <Typography
            sx = {{m:2}}
            variant = 'h2'>Your Courses</Typography>
            <ul>
                {courses.map(course => {
                    return (
                        <li>{course.course_name} {course.total_holes } {course.total_par}</li>
                    )
            })}
            </ul>
            
        {/* <Grid container className="rounds-list">
            {courses.map(round => {
                return (
                    <Grid key={round.id} item xs={12} lg={12}>
                        <RoundItem  round={round} />
                    </Grid>
                )
            })}
        </Grid> */}
        </>
        
    )
}
export default CoursesView;