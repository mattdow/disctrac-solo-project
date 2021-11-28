import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, CardActions, CardContent, Typography, Button, IconButton, CardMedia } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DeleteModal from '../DeleteModal/DeleteModal';
import { typography } from '@mui/system';

// creating a course component for each individual course search result for ease of selecting and styling
// pass in the particular course from the SearchCourseList array map
function SearchCourseItem({ result }) {
    // define the useDispatch hook as a variable
    const dispatch = useDispatch();
    // define the useHistory hook as a variable
    const history = useHistory();
    
    // define a function for actions to run when a course is clicked
    const addCourse = () => {
        console.log('In addCourse for DGCR ID:', result.course_id);
        dispatch({ type: 'ADD_NEW_COURSE', payload: result});
        // history.push('/courses');
    }

    // return JSX rendering material
    return (
        <Card variant="outlined" sx={{my:2, mx:0.4, boxShadow: 1, borderRadius: 1}}>
            <CardContent sx={{display: 'flex', justifyContent: 'center', pb: 0,  }}>
                <Typography 
                    variant = "body"
                    fontWeight = "bold">
                    {result.name}
                </Typography>
            </CardContent>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between', pt:0.5}}>   
                <Typography 
                    variant = "body" sx={{ml:1}}>
                    {result.city}
                </Typography>
                <Typography 
                    variant = "body" sx={{mr:1}}>
                    {result.holes} Holes
                </Typography>
            </CardContent>  
            <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                <Button  
                    variant="contained"
                    onClick={() => addCourse()}>ADD COURSE</Button>
            </CardActions>
        </Card>
    )
}

export default SearchCourseItem;