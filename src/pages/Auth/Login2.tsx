import React from 'react';

import { PostRequest } from '../../service/services';

import { Button, TextField, Typography } from '@mui/material';

import { loginSuccess } from '../../features/auth/authSlice';

import { useDispatch } from 'react-redux';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();

  const history = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()

      .email('Invalid email format')

      .required('Email is required'),

    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (
    values: { username: string; password: string },

    {
      setSubmitting,

      setFieldError,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;

      setFieldError: (field: string, message: string) => void;
    }
  ) => {
    try {
      const response = await PostRequest(`/account/login`, {
        email: values.username,

        password: values.password,
      });

      dispatch(
        loginSuccess({
          username: values.username,

          accessToken: response.data.accessToken,
        })
      );

      console.log('Login successful!');

      history('/Home');
    } catch (error) {
      console.error('Login error:', error);

      // Set error message based on response status or custom error handling

      setFieldError('password', 'Invalid username or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginLeft: '350px' }}>
      <Typography variant="h2">Login</Typography>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field
                as={TextField}
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div>
              <Field
                as={TextField}
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
