import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PostRequest } from "../../service/services";

const ResetPasswordSchema = Yup.object().shape({
  newPassword1: Yup.string().required().min(6).label("Password"),
  newPassword2: Yup.string()
    .required()
    .oneOf([Yup.ref("newPassword1")], "Passwords must match")
    .label("Repeat Password"),
});

const ResetPassword = () => {
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

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
        console.log("token", token);
        await PostRequest(`account/password-reset-confirm/${token}`, values);
        navigate("/");
      } catch (error) {
        setGeneralError("Error resetting password");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      {token}
      <Box
        sx={{
          display: "flex",
          color: "white",
          flexDirection: "column",
          alignItems: "center",

          mt: 8,
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
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
              formik.touched.newPassword1 && Boolean(formik.errors.newPassword1)
            }
            helperText={
              formik.touched.newPassword1 && formik.errors.newPassword1
            }
            style={{
              marginBottom: "16px",
            }}
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
              formik.touched.newPassword2 && Boolean(formik.errors.newPassword2)
            }
            helperText={
              formik.touched.newPassword2 && formik.errors.newPassword2
            }
            style={{
              marginBottom: "16px",
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
            disabled={formik.isSubmitting}
            sx={{ mt: 2, width: "160px" }}
          >
            {formik.isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
