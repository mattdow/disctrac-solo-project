import React from 'react';
import { AppBar, Toolbar, CssBaseline, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

// Create some styles for use in the component


const useStyles = makeStyles((theme) => ({
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
}));

function Banner() {
    // call useStyles to load the classes defined above the function
    const classes = useStyles();
    //JSX rendering code
    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    DiscTrac
                </Typography>
            </Toolbar>
        </AppBar>
    )
} // end of Navbar
export default Banner;