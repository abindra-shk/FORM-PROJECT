import React from "react";
import { PostRequest } from "../../service/services";
import { Button, TextField, Typography } from "@mui/material";
import { loginSuccess } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
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

      console.log("Login successful!");
      navigate('/Home');
    } catch (error) {
      console.error("Login error:", error);
    
      setFieldError("password", "Invalid username or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginLeft: "350px" }}>
      <Typography variant="h2">Login</Typography>
      <Formik
        initialValues={{ username: "", password: "" }}
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
                label="Email"
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

            <Button variant="contained" type="submit" sx={{my:2}} disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
<div>
  <Link to="/register"><Button variant="contained" sx={{my:1}}>Register</Button></Link>
</div>
<div>
<Link to="/forget-password"><Button variant="contained" sx={{my:1}}>ForgetPassword</Button></Link>

</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
