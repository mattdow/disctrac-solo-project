import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { ClassNames } from '@emotion/react';



function BottomNavBar() {
    // define a state variable for the navigation bar
    const [value, setValue] = React.useState(0);
    // define a variable for useHistory hook
    const history = useHistory();
    // add styles to ensure the navbar sticks to the bottom of the page
    // rendering code for the navbar
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            >
            <BottomNavigationAction label="Rounds" 
                icon={<RestoreIcon />} 
                onClick = {(event) => history.push('/rounds')}
                />
            <BottomNavigationAction label="Profile" 
                icon={<PersonIcon />} 
                onClick = {(event) => history.push('/profile')}
                />
            <BottomNavigationAction label="Courses" 
                icon={<LocationOnIcon />} 
                onClick = {(event) => history.push('/courses')}
                />
            </BottomNavigation>
        </Paper>
    ) // end of rendering code
} // end of BottomNavBar

export default BottomNavBar;