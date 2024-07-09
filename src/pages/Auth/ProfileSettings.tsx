import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
} from '@mui/material';

import { PostRequest } from '../../services/services';
import { API_ENDPOINTS } from '../../utils/constant';


const PasswordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  logoutFromAllDevice: Yup.boolean(),
  newPassword1: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$/,
      'Password must contain at least one digit, one special character, and one uppercase letter'
    )
    .required('New password is required'),
  newPassword2: Yup.string()
    .oneOf([Yup.ref('newPassword1')], 'Passwords must match')
    .required('Repeat password is required'),
});

const ProfileSettings = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const userInfo = useSelector((state: any) => state.auth.userInfo);

  const handlePasswordChange = () => {
    setIsChangingPassword(true);
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      logoutFromAllDevice: false,
      newPassword1: '',
      newPassword2: '',
    },
    validationSchema: PasswordChangeSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await PostRequest(API_ENDPOINTS.CHANGE_PASSWORD, values);
        console.log('Password change successful', response.data);
        setIsChangingPassword(false); // Hide the form after successful password change
      } catch (error) {
        console.error('Password change failed', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
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
          Profile Settings
        </Typography>
        <Typography variant="h6" component="h2">
          User Information
        </Typography>
        <Typography variant="body1">Username: {userInfo?.userName}</Typography>
        <Typography variant="body1">Email: {userInfo?.email}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordChange}
          sx={{ mt: 2 }}
        >
          Change Password
        </Button>
        {isChangingPassword && (
          <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Current Password"
              variant="outlined"
              type="password"
              name="currentPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
              error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
              helperText={formik.touched.currentPassword && formik.errors.currentPassword}
              margin="normal"
            />
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              type="password"
              name="newPassword1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword1}
              error={formik.touched.newPassword1 && Boolean(formik.errors.newPassword1)}
              helperText={formik.touched.newPassword1 && formik.errors.newPassword1}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Repeat New Password"
              variant="outlined"
              type="password"
              name="newPassword2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword2}
              error={formik.touched.newPassword2 && Boolean(formik.errors.newPassword2)}
              helperText={formik.touched.newPassword2 && formik.errors.newPassword2}
              margin="normal"
            />
            {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <Typography variant="body2">Logout from all devices?</Typography>
              <TextField
                type="checkbox"
                name="logoutFromAllDevice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.logoutFromAllDevice}
                error={formik.touched.logoutFromAllDevice && Boolean(formik.errors.logoutFromAllDevice)}
                helperText={formik.touched.logoutFromAllDevice && formik.errors.logoutFromAllDevice}
              />
            </Box> */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={formik.isSubmitting}
              sx={{ mt: 2 }}
            >
              {formik.isSubmitting ? 'Changing password...' : 'Change Password'}
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default ProfileSettings;
