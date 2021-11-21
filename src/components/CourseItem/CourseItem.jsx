import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography, Button, IconButton } from '@mui/material';
import { flexbox } from '@mui/system';

// Creating a component for each individual course in the DB for ease of selecting and styling
// Passing in the specific course from the CoursesView array map
function CourseItem({course}) {
    // create variables for the dispatch and router hooks
    const dispatch = useDispatch();
    const history = useHistory();
    // grab the current user from the Redux store
    const user = useSelector((store) => store.user);
    console.log('User object is: ', user);


    // JSX code to render to the DOM
    return (
        <Card variant="outlined" sx={{my:2}}>
                <Typography
                    variant="h6">
                    {course.course_name}
                </Typography>
                <Typography
                    variant = "body2">
                    {course.total_holes} Holes    
                </Typography>
                <Typography
                    variant="body2">
                    Par {course.total_par}
                </Typography>
            <CardActions sx={{display: "flex",
            justifyContent: "space-evenly"}}>
                <Button variant="outlined">
                    Start Round
                </Button>
                {user.is_admin && 
                <Button variant="outlined"
                        color="secondary">
                    Edit Course
                </Button>}
            </CardActions>
        </Card>
    )
}
export default CourseItem;