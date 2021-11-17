import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';

// Creating a hole score component for each hole score in a particular round. Passing in the round from the ReviewRound array map
function HoleScoreItem({ score }) {
    // create a variable for the dispatch hook
    const dispatch = useDispatch();
    // create a variable for the router hook
    const history = useHistory();
    // grab the active round information from the Redux store
    const activeRound = useSelector((store) => store.activeRound);
    // get the course and round from activeRound
    console.log(activeRound);
    const course = activeRound.course_id;
    const round = activeRound.round_id;
    // Define a function to route to the appropriate HoleScoreView
    function editScore() {
        history.push(`/activeround/${course}/${score.hole_number}/${round}`)
    }

    return (
        <Card variant="outlined" sx={{my:2}}>
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
                <Button size="large" 
                        variant="outlined"
                        onClick={editScore}
                        >EDIT</Button>
            </CardActions>
        </Card>
    )
}

export default HoleScoreItem;