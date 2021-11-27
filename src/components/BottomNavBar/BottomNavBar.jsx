import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';



function BottomNavBar() {
    // define a state variable for the navigation bar
    const [value, setValue] = React.useState(0);
    // define a variable for useHistory hook
    const history = useHistory();
    // rendering code for the navbar
    return (
        <Box sx={{ width: 1 }}>
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
        </Box>
    ) // end of rendering code
} // end of BottomNavBar

export default BottomNavBar;