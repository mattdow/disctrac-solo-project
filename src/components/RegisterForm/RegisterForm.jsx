import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Box } from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser
  return (
    <Box sx={{ pb: 7, backgroundColor: '#F5FBEF'}}>
      <Typography variant="h4" align="left"
        sx={{pt:2, mt:0.2, mb:1, mx:1}}>Register a User
      </Typography>
      {errors.registrationMessage && (
        <Typography variant="h5" className="alert" role="alert">
          {errors.registrationMessage}
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
            onClick={registerUser}>
            Register
        </Button> 
      </Box>
    </Box>    
  );

  // return (
  //   <form className="formPanel" onSubmit={registerUser}>
  //     <h2>Register User</h2>
  //     {errors.registrationMessage && (
  //       <h3 className="alert" role="alert">
  //         {errors.registrationMessage}
  //       </h3>
  //     )}
  //     <div>
  //       <label htmlFor="username">
  //         Username:
  //         <input
  //           type="text"
  //           name="username"
  //           value={username}
  //           required
  //           onChange={(event) => setUsername(event.target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <label htmlFor="password">
  //         Password:
  //         <input
  //           type="password"
  //           name="password"
  //           value={password}
  //           required
  //           onChange={(event) => setPassword(event.target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <input className="btn" type="submit" name="submit" value="Register" />
  //     </div>
  //   </form>
  // );
}

export default RegisterForm;
