import React from 'react';
import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterForm: React.FC = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (data: RegisterFormData) => {
    setSubmitting(true);
    // Handle form submission logic here
    console.log(data);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 10 ,mx:5,spacing:3}}>
        <Typography variant="h5" sx={{ p: 3,mx:20 }}>Register</Typography>
        <Controller 
          name="email"
          control={control}
          render={({ field }) => (
            <TextField sx={{ p: 3 }}
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={submitting}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField sx={{ p: 3 }}
              {...field}
              label="Username"
              variant="outlined"
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
              disabled={submitting}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField sx={{ p: 3 }}
              {...field}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={submitting}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField sx={{ p: 3 }}
              {...field}
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              disabled={submitting}
            />
          )}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Register'}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default RegisterForm;
