import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { PostRequest } from "../../service/services";

const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPassword = () => {
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Implement your password reset logic here (API call, etc.)
      console.log("Password reset email sent to:", values.email);
    } catch (error) {
      console.error("Password reset error:", error);
      setFieldError("email", "Failed to reset password"); 
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Typography variant="h2">Forget Password</Typography>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field
                as={TextField}
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="email" />}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPassword;
