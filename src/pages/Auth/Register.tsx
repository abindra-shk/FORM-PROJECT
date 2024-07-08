import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Link } from '@mui/material';
import { PostRequest } from '../../services/services';
import { API_ENDPOINTS } from '../../utils/constant';

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    userName: '',
    email: '',
    password: '',
    repeat_password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await PostRequest(`${API_ENDPOINTS.ACCOUNT}/register`, formValues);
      console.log('Registration successful', response.data);
      navigate('/login'); // Navigate to the login page after successful registration
    } catch (error) {
      console.error('Registration failed', error);
      // Handle registration failure (e.g., display error message)
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <TextField
          fullWidth
          label="Username"
          name="userName"
          variant="outlined"
          value={formValues.userName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="outlined"
          type="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Repeat Password"
          name="repeat_password"
          variant="outlined"
          type="password"
          value={formValues.repeat_password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" sx={{width:'100px'}}>
          Register
        </Button>
        <Typography variant="body2" component="p" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link onClick={() => navigate('/login')} sx={{ cursor: 'pointer' }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterForm;
