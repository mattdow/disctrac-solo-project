import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button, Box } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <Box sx={{ pb: 7, backgroundColor: '#F5FBEF' }}>
      <LoginForm />

      <center>
        <Button
          type="button"
          size="large"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </Box>
  );
}

export default LoginPage;
