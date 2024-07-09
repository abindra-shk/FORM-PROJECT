import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/Login/ResetPassword";

const App: React.FC = () => {
  return (

    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register/>} />
          
          {/* <Route path="/account/password-reset/confirm/:token" element={<ResetPassword />}/> */}
        </Routes>
        <Footer />
      </Router>
    </Provider>

  
  );
};

export default App;
