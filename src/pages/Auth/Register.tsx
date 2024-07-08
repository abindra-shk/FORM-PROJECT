import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Link,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PostRequest } from '../../services/services';
import { API_ENDPOINTS } from '../../utils/constant';

const pswdPtrn = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$/;

const RegisterSchema = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .min(3, 'Must be at least 3 characters')
    .max(50, 'Must be 50 characters or less')
    .required('Required')
    .label('Username'),
  email: Yup.string()
    .trim()
    .email('Invalid email address')
    .required('Required')
    .label('Email'),
  password: Yup.string()
    .trim()
    .matches(
      pswdPtrn,
      'Password must contain at least one digit, one special character, and one uppercase letter'
    )
    .required('Required')
    .label('Password'),
  repeat_password: Yup.string()
    .trim()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required')
    .label('Repeat Password'),
});

const RegisterForm = () => {
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      repeat_password: '',
    },
    validationSchema: RegisterSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await PostRequest(
          `${API_ENDPOINTS.ACCOUNT}/register`,
          values
        );
        console.log('Registration successful', response.data);
        navigate('/login'); // Navigate to the login page after successful registration
      } catch (error) {
        console.error('Registration failed', error);
        setGeneralError('Registration failed, please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Box
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
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            name="userName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Repeat Password"
            variant="outlined"
            type="password"
            name="repeat_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeat_password}
            error={formik.touched.repeat_password && Boolean(formik.errors.repeat_password)}
            helperText={formik.touched.repeat_password && formik.errors.repeat_password}
            margin="normal"
          />
          {generalError && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {generalError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={formik.isSubmitting}
            sx={{ mt: 2 }}
          >
            {formik.isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>
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
