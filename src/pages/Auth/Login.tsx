import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Link,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PostRequest } from "../../services/services";
import { API_ENDPOINTS } from "../../utils/constant";
import { setAuthInfo } from "./authSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const LoginForm = () => {
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await PostRequest(API_ENDPOINTS.LOGIN, values);
        const { accessToken, refreshToken, data } = response.data;
        localStorage.setItem("accessToken", accessToken);
        dispatch(setAuthInfo({ accessToken, refreshToken, userInfo: data }));
        navigate("/form");
      } catch (error) {
        setGeneralError("Invalid email or password");
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
            Login
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
                marginBottom: "16px",
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
              size="large"
              fullWidth
              sx={{ mt: 2, height:'52px'}}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
          <Typography variant="body2" component="p" sx={{ mt: 6 }}>
            Forgot{" "}
            <Link
              onClick={() => navigate("/forget-password")}
              sx={{ cursor: "pointer" }}
            >
              Password?
            </Link>
          </Typography>
          <Typography variant="body2" component="p" sx={{ mt: 1 }}>
            Don't have an account?{" "}
            <Link
              onClick={() => navigate("/register")}
              sx={{ cursor: "pointer" }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
