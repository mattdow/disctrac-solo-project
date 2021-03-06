import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography, Button, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DeleteModal from '../DeleteModal/DeleteModal';

// creating a round component for each individual round item for ease of selecting and styling
// pass in the round from the RoundsView array map
function RoundItem({ round }) {
    // create a variable for the dispatch hook
    const dispatch = useDispatch();
    // create a variable for the router hook
    const history = useHistory();
    // grab the current user from the Redux store
    const user = useSelector((store) => store.user)
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
    const addRound = (courseID) => {
        console.log('In addRound for', courseID);
        // call the active round action to post a new round to the database and add the course and user info to the active round object
        dispatch({type: 'START_NEW_ROUND', payload: {
            user: user.id, course: courseID
        }})
        history.push(`/activeround/${courseID}/1`);
    } // end of addRound
    //define a function for actions to run when an edit button is clicked
    const editRound = (round) => {
        // route to a review round view for the round and course ID corresponding to the clicked card
        history.push(`review/${round.id}/${round.courseid}`)
    }
    // return JSX rendering material
    return (
        <Card variant="outlined" sx={{my:2, mx:0.4, boxShadow: 1, borderRadius: 1}}>
            <CardContent sx={{display: 'flex', justifyContent: 'center', pb: 0,  }}>
                <Typography 
                    variant = "body"
                    fontWeight = "bold">
                    {round.course_name}
                </Typography>
            </CardContent>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between', pt:0}}>   
                <Typography 
                    variant = "body" sx={{ml:1}}>
                    {convertDate(round.date_played)}
                </Typography>
                <Typography 
                    variant = "body" sx={{mr:1}}>
                    {convertScore(round.total_score)}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton aria-label="edit"
                        color="secondary"
                        onClick={() => editRound(round)}
                        >
                    <Edit fontSize="large"/>
                </IconButton>
                <Button size="large" 
                        variant="contained"
                        onClick={() => addRound(round.courseid)}>START NEW ROUND</Button>
                <DeleteModal round={round}/>
            </CardActions>
        </Card>
    )
}

export default RoundItem;