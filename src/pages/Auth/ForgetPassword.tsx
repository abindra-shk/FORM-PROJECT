import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PostRequest } from '../../services/services';
import { API_ENDPOINTS } from '../../utils/constant';

const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
});

const ForgetPassword = () => {
  const [generalError, setGeneralError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgetPasswordSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await PostRequest(API_ENDPOINTS.FORGET_PASSWORD, values);
        alert(`Email Sent. Check your email: ${values.email}`);
      } catch (error) {
        setGeneralError('Error sending OTP');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: '10px',
          width: '100%',
          color: 'white',
          backgroundColor: '#1c1f26',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Forget Password
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop:'20px' }}>
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
              size="large"
            >
              {formik.isSubmitting ? 'Sending...' : 'Send OTP'}
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgetPassword;
