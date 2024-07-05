import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Link } from '@mui/material';
import { PostRequest } from '../../services/services';
import { API_ENDPOINTS } from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { setAuthInfo } from './authSlice';

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await PostRequest(`${API_ENDPOINTS.ACCOUNT}/login`, formValues);
      const { accessToken, data } = response.data;
      localStorage.setItem('accessToken',accessToken);
      console.log('Login successful', response.data);
      dispatch(setAuthInfo({ accessToken, userInfo: data }));
      navigate('/form'); // Navigate to the form component on submit
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          color: 'white',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
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
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Typography variant="body2" component="p" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link onClick={() => navigate('/register')} sx={{ cursor: 'pointer' }}>
            Create an account
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
