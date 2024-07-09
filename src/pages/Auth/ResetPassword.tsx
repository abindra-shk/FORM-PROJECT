import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PostRequest } from "../../services/services";
import { API_ENDPOINTS } from "../../utils/constant";

const ResetPasswordSchema = Yup.object().shape({
  newPassword1: Yup.string().required().min(6).label("Password"),
  newPassword2: Yup.string()
    .required()
    .oneOf([Yup.ref("newPassword1")], "Passwords must match")
    .label("Repeat Password"),
});

const ResetPassword = () => {
  const [generalError, setGeneralError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      newPassword1: "",
      newPassword2: "",
    },
    validationSchema: ResetPasswordSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await PostRequest(`${API_ENDPOINTS.RESET_PASSWORD}/${token}`, values);
        navigate("/login");
      } catch (error) {
        setGeneralError("Error resetting password");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: "10px",
          width: "100%",
          color: "white",
          backgroundColor: "#1c1f26",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Reset Password
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Password"
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
                formik.touched.newPassword1 && formik.errors.newPassword1
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Repeat Password"
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
                formik.touched.newPassword2 && formik.errors.newPassword2
              }
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
              size="large"
            >
              {formik.isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
