import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography, Button, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DeleteModal from '../DeleteModal/DeleteModal';
import { typography } from '@mui/system';

// creating a course component for each individual course search result for ease of selecting and styling
// pass in the particular course from the SearchCourseList array map
function SearchCourseItem({ result }) {
    



    // return JSX rendering material
    return (
        <Card variant="outlined" sx={{my:2}}>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography
                    variant = "body2">
                    {result.name}
                </Typography>
                <Typography 
                    variant = "body2">
                    City: {result.city}
                </Typography>
                <Typography
                    variant = "body2">
                    {result.holes} Holes
                </Typography>
            </CardContent>




        </Card>
    )
}

export default SearchCourseItem;