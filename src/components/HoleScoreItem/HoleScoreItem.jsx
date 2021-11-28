import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';

// Creating a hole score component for each hole score in a particular round. Passing in the round from the ReviewRound array map
function HoleScoreItem({ score, course, round }) {
    // create a variable for the dispatch hook
    const dispatch = useDispatch();
    // create a variable for the router hook
    const history = useHistory();

    // console.log('Course ID from props', course);
    // console.log('Score object from props', round);
    
    
    // Define a function to route to the appropriate HoleScoreView
    function editScore() {
        history.push(`/editround/${course}/${score.hole_number}/${round}/${score.id}`)
    }

    return (
        <Card variant="outlined" sx={{my:2, mx:0.4, boxShadow: 1, borderRadius: 1}}>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography 
                    variant = "h6">
                    Hole {score.hole_number}
                </Typography>
                <Typography 
                    variant = "h6">
                    Par {score.par_score}
                </Typography>
                <Typography 
                    variant = "h6">
                    Score {score.score}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                <Button  
                        variant="contained"
                        onClick={editScore}
                        >EDIT SCORE</Button>
            </CardActions>
        </Card>
    )
}

export default HoleScoreItem;