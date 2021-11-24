import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

function ProfilePage() {
    // get the user's info from the store
    const user = useSelector((store) => store.user);
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // set history hook as a variable for use
    const history = useHistory();


    // JSX code to render to the DOM
    return (
        <Typography
            sx = {{m:2}}
            variant = 'h4'>Your Profile
        </Typography>
    )
}
export default ProfilePage;