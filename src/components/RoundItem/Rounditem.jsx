import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';

// creating a round component for each individual round item for ease of selecting and styling
// pass in the round from the RoundsView array map
function RoundItem({ round }) {
    // create a variable for the dispatch hook
    const dispatch = useDispatch();
    // create a variable for the router hook
    const history = useHistory();
    // define a function to convert the SQL date string to common date format
    const convertDate = (dateString) => {
        let date_new = new Date(dateString);
        return new Intl.DateTimeFormat('en-US').format(date_new);
    }
    // define a function to add a '+' to any score that is above zero
    const convertScore = (scoreString) => {
        if (Number(scoreString) > 0) {
            return ('+' + scoreString)
        } else if (Number(scoreString) === 0) {
            return ('Even Par');
        } else {
            return scoreString;
        }
    }
    // define a function for actions to run when a round is clicked
    const addRound = (round) => {

    } // end of addRound

    return (
        <Card variant="outlined" sx={{my:2}}
              onClick={() => addRound(round)}>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography 
                    variant = "body2">
                    {round.course_name}
                </Typography>
                <Typography 
                    variant = "body2">
                    {convertDate(round.date_played)}
                </Typography>
                <Typography 
                    variant = "body2">
                    {convertScore(round.total_score)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="large" 
                        variant="outlined"
                        onClick={() => addRound(round.course_id)}>PLAY AGAIN</Button>
            </CardActions>
        </Card>
    )
}

export default RoundItem;