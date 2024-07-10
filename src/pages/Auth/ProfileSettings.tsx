/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Tab,
  Tabs,
  Paper,
} from '@mui/material';

import { PostRequest } from '../../services/services';
import { API_ENDPOINTS } from '../../utils/constant';

const PasswordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
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
  const [value, setValue] = useState(0); // State for tab value
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const userInfo = useSelector((state: any) => state.auth.userInfo);

  // const handlePasswordChange = () => {
  //   setIsChangingPassword(true);
  //   setValue(1); // Switch to password change tab when "Change Password" is clicked
  // };

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword1: '',
      newPassword2: '',
    },
    validationSchema: PasswordChangeSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await PostRequest(
          API_ENDPOINTS.CHANGE_PASSWORD,
          values
        );
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
    <Container
      maxWidth="sm"
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
            Profile Settings
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={value}
              onChange={(e: any, newValue) => setValue(newValue)}
              aria-label="profile tabs"
            >
              <Tab sx={{ color: 'white' }} label="General Information" />
              <Tab sx={{ color: 'white' }} label="Change Password" />
            </Tabs>
            <Box sx={{ p: 3 }}>
              <TabPanel value={value} index={0}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  defaultValue={userInfo?.userName}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  defaultValue={userInfo?.email}
                  sx={{ mt: 4 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert('Implement edit functionality')}
                  sx={{ mt: 4 }}
                  size="large"
                  fullWidth
                >
                  Edit
                </Button>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box sx={{ mt: 2 }}>
                  <form
                    onSubmit={formik.handleSubmit}
                    style={{ width: '100%' }}
                  >
                    <TextField
                      fullWidth
                      label="Current Password"
                      variant="outlined"
                      type="password"
                      name="currentPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.currentPassword}
                      error={
                        formik.touched.currentPassword &&
                        Boolean(formik.errors.currentPassword)
                      }
                      helperText={
                        formik.touched.currentPassword &&
                        formik.errors.currentPassword
                      }
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
                      error={
                        formik.touched.newPassword1 &&
                        Boolean(formik.errors.newPassword1)
                      }
                      helperText={
                        formik.touched.newPassword1 &&
                        formik.errors.newPassword1
                      }
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
                      error={
                        formik.touched.newPassword2 &&
                        Boolean(formik.errors.newPassword2)
                      }
                      helperText={
                        formik.touched.newPassword2 &&
                        formik.errors.newPassword2
                      }
                      margin="normal"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      disabled={formik.isSubmitting}
                      sx={{ mt: 4 }}
                    >
                      {formik.isSubmitting
                        ? 'Changing password...'
                        : 'Change Password'}
                    </Button>
                  </form>
                </Box>
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default ProfileSettings;
