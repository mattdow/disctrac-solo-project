import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography, Button, IconButton } from '@mui/material';
import { flexbox } from '@mui/system';
import { StarRateRounded } from '@mui/icons-material';

// Creating a component for each individual course in the DB for ease of selecting and styling
// Passing in the specific course from the CoursesView array map
function CourseItem({course}) {
    // create variables for the dispatch and router hooks
    const dispatch = useDispatch();
    const history = useHistory();
    // grab the current user from the Redux store
    const user = useSelector((store) => store.user);
    
    // define a function to create a round in the DB and route the user to the appropriate Hole Score View
    function startRound() {
        console.log('In startRound for', course.course_name);
        // call an action to post a new round to the DB and add the course and user info to the active round object
        dispatch({ type: 'START_NEW_ROUND', payload: {
            user: user.id, course: course.id
        }})
        history.push(`activeround/${course.id}/1`);
    } // end of startRound
    console.log('User object is: ', user);
    console.log('Course object is: ', course);
    // JSX code to render to the DOM
    return (
        <Card variant="outlined" sx={{my:2, mx:0.4, boxShadow: 1, borderRadius: 1}}>
                <CardContent sx={{display: 'flex', justifyContent: 'center', pb: 0,  }}>
                    <Typography 
                        variant = "body"
                        fontWeight = "bold">
                        {course.course_name}
                    </Typography>
                </CardContent>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between', pt:0}}>   
                <Typography 
                    variant = "body" sx={{ml:1}}>
                    {course.total_holes} Holes
                </Typography>
                <Typography 
                    variant = "body" sx={{mr:1}}>
                    Par {course.total_par}
                </Typography>
            </CardContent>
            <CardActions sx={{display: "flex",
            justifyContent: "space-evenly"}}>
                <Button variant="contained"
                        onClick={() => startRound()}>
                    Start Round
                </Button>
                {user.is_admin && 
                <Button variant="contained"
                        color="secondary">
                    Edit Course
                </Button>}
            </CardActions>
        </Card>
    )
}
export default CourseItem;