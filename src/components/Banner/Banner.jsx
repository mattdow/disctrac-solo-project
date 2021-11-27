import React from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, CssBaseline, Typography, Button} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import './Banner.css';
import LogOutButton from '../LogOutButton/LogOutButton';

// Create some styles for use in the component


// const useStyles = makeStyles((theme) => ({
//     logo: {
//         flexGrow: "1",
//         cursor: "pointer",
//     },
// }));

function Banner() {
    const dispatch = useDispatch();
    //JSX rendering code
    return (
        <AppBar position="static" style={{background: '#386641'}} >
            <CssBaseline />
            <Toolbar style={{justifyContent: 'space-around'}}>
                <Typography variant="h3">
                    DiscTrac
                </Typography>
                {/* <Button sx={{color: 'secondary.contrastText', mx: 1}}
                onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</Button> */}
            </Toolbar>
        </AppBar>
    )
} // end of Navbar
export default Banner;