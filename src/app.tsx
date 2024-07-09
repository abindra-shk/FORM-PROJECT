import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import { PersistGate } from "redux-persist/integration/react";
import ForgetPassword from "./pages/Login/ForgetPassword";
import ResetPassword from "./pages/Login/ResetPassword";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword/>}/>
            <Route path="/account/password-reset/confirm/:token" element={<ResetPassword />} />
          
          </Routes>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
