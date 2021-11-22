import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import CourseItem from '../CourseItem/CourseItem';


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
            variant = 'h2'>Courses</Typography>
            
        <Grid container className="courses-list">
            {courses.map(course => {
                return (
                    <Grid key={course.id} item xs={12} lg={12}>
                        <CourseItem  course={course} />
                    </Grid>
                )
            })}
        </Grid>
        </>
        
    )
}
export default CoursesView;