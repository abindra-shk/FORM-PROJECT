import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PostRequest } from '../../services/services';
import { API_ENDPOINTS } from '../../utils/constant';

const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
});

const ForgetPassword = () => {
  const [generalError, setGeneralError] = useState('');
//   const navigate = useNavigate();

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
        // navigate('/reset-password');
      } catch (error) {
        setGeneralError('Error sending OTP');
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
          Forget Password
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
            {formik.isSubmitting ? 'Sending...' : 'Send OTP'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgetPassword;
