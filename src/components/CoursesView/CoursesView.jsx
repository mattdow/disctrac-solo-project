import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button, Box } from '@mui/material';
import CourseItem from '../CourseItem/CourseItem';
import BottomNavBar from '../BottomNavBar/BottomNavBar';


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
        <Box sx={{ pb: 7, backgroundColor: '#F5FBEF'}}>
            <Box display='flex' justifyContent='center'>
                <Typography
                    align='center'
                    sx = {{pt:2, mt:0.2}}
                    variant = 'h4'>Courses</Typography>

                <Button
                    sx= {{mt:2.5, ml:3}}
                    onClick = {() => history.push('/searchcourses')}
                    variant = "contained"
                    color = "success"
                    >
                        Course Search
                </Button>
        </Box>  
                
            <Grid container className="courses-list">
                {courses.map(course => {
                    return (
                        <Grid key={course.id} item xs={12} lg={12}>
                            <CourseItem  course={course} />
                        </Grid>
                    )
                })}
            </Grid>
            <BottomNavBar />
        </Box>
    )
}
export default CoursesView;