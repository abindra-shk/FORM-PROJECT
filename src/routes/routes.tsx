import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../pages/Auth/Login';
import RegisterForm from '../pages/Auth/Register';
import Form from '../pages/Home/Form/Form';
import ProtectedRoute from './protectedRoute';

const MainRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/form" element={<Form />} />
      </Route>
    </Routes>
  );
};

export default MainRoute;
