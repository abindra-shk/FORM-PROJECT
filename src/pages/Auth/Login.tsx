import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Link,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PostRequest } from '../../services/services';
import { API_ENDPOINTS } from '../../utils/constant';
import { setAuthInfo } from './authSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
});

const LoginForm = () => {
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await PostRequest(
          `${API_ENDPOINTS.ACCOUNT}/login`,
          values
        );
        const { accessToken, data } = response.data;
        localStorage.setItem('accessToken', accessToken);
        dispatch(setAuthInfo({ accessToken, userInfo: data }));
        navigate('/form');
      } catch (error) {
        setGeneralError('Invalid email or password');
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
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
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
            style={{
              marginBottom: '16px',
            }}
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
            style={{
              marginBottom: '16px',
            }}
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
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <Typography variant="body2" component="p" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link
            onClick={() => navigate('/register')}
            sx={{ cursor: 'pointer' }}
          >
            Create an account
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
