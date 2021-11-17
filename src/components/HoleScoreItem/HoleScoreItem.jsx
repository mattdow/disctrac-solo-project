import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';

// Creating a hole score component for each hole score in a particular round. Passing in the round from the ReviewRound array map
function HoleScoreItem({ score }) {
    // create a variable for the dispatch hook
    const dispatch = useDispatch();
    // create a variable for the router hook
    const history = useHistory();

    return (
        <Card variant="outlined" sx={{my:2}}>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography 
                    variant = "body2">
                    Hole {score.hole_number}
                </Typography>
                <Typography 
                    variant = "body2">
                    Par {score.par_score}
                </Typography>
                <Typography 
                    variant = "body2">
                    Score {score.score}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="large" 
                        variant="outlined"
                        >EDIT</Button>
            </CardActions>
        </Card>
    )
}

export default HoleScoreItem;