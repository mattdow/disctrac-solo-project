import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

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
            <CardContent>
                <Typography 
                    variant = "body2" sx={{mx:1}}
                    display = "inline"
                    align = "left">
                    {round.course_name}
                </Typography>
                <Typography 
                    variant = "body2" sx={{mx:1}}
                    display = "inline"
                    align = "center">
                    {convertDate(round.date_played)}
                </Typography>
                <Typography 
                    variant = "body2" sx={{mx:1}}
                    display = "inline"
                    align = "right">
                    {convertScore(round.total_score)}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default RoundItem;