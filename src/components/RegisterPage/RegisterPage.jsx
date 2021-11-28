import React from 'react';
import { Button, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <Box sx={{ pb: 7, backgroundColor: '#F5FBEF' }}>
      <RegisterForm />

      <center>
        <Button
          type="button"
          size="large"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          LOGIN
        </Button>
      </center>
    </Box>
  );
}


export default RegisterPage;
