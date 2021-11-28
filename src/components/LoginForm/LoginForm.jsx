import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Button, Card, Paper, TextField, Typography, Box, Input, IconButton, InputLabel, FormControl } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Box sx={{ pb: 7, backgroundColor: '#F5FBEF'}}>
      {/* <form className="formPanel" onSubmit={login}> */}
      <Typography variant="h4" align="left"
        sx={{pt:2, mt:0.2, mb:1, mx:1}}>Login
      </Typography>
      {errors.loginMessage && (
        <Typography variant="h5" className="alert" role="alert">
          {errors.loginMessage}
        </Typography>
      )}
      <Box>
        <TextField 
          sx={{ml:2}}
          variant="standard"
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}          
          />
      </Box>
      {/* <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div> */}
      <Box>
        <TextField 
          sx={{ml:2}}
          variant="standard"
          type="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}          
          />
      </Box>
      <Box>
        <Button sx={{m:2}}
            variant="contained"
            color="success"
            align = 'right'
            onClick={login}>
            Login
        </Button> 
      </Box>
    {/* </form> */}

    </Box>
    
  );
}

export default LoginForm;
