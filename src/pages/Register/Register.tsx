import React from "react";
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import axios from 'axios';
import { PostRequest } from "../../service/services";
import { useNavigate } from "react-router-dom";
interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const pswdPtrn = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;

const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be 50 characters or less")
    .required("Required")
    .label("Username"),
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Required")
    .label("Email"),
  password: yup
    .string()
    .trim()
    .matches(
      pswdPtrn,
      "Password must contain at least one digit, one special character, and one uppercase letter"
    )
    .required("Required")
    .label("Password"),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required")
    .label("Repeat Password"),
});

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    setSubmitting(true);
    try {
      const payload = {
        email: data.email,
        userName: data.username,
        password: data.password,
        repeat_password: data.confirmPassword,
      };

      console.log("payload===", payload);

      const response = await PostRequest("/account/register", payload);
      alert("Registered succesfully");
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 10, mx: 5, spacing: 3 }}>
        <Typography variant="h5" sx={{ p: 3, mx: 20 }}>
          Register
        </Typography>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ p: 3 }}
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
            <TextField
              sx={{ p: 3 }}
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
            <TextField
              sx={{ p: 3 }}
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
            <TextField
              sx={{ p: 3 }}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Register"}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default RegisterForm;
