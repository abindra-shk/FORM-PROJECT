import { Routes, Route } from 'react-router-dom';
import LoginForm from '../pages/Auth/Login';
import RegisterForm from '../pages/Auth/Register';
import Form from '../pages/Home/Form/Form';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />{' '}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
};

export default MainRoute;
