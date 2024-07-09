import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../pages/Auth/Login';
import RegisterForm from '../pages/Auth/Register';
// import Form from '../pages/Home/Form/Form';
import ProtectedRoute from './protectedRoute';
import Home from '../pages/Home';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import ResetPassword from '../pages/Auth/ResetPassword';

const MainRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/account/password-reset/confirm/:token" element={<ResetPassword />} />
      /* Protected routes */
      <Route element={<ProtectedRoute />}>
        <Route path="/form" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default MainRoute;
