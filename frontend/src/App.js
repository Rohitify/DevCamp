import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Showcase from "./components/Showcase";

import "./css/bootstrap.css";
import "./css/style.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import Bootcamps from "./pages/bootcamp/Bootcamps";
// import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import Bootcamp from "./pages/bootcamp/Bootcamp";

function App() {
  return (
    <Provider store={store}>
      <Router>
          <NavBar/>
        <Routes>
          <Route path="/" element={<Showcase />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bootcamps" element={<Bootcamps />} />
          <Route path="/bootcamp/:bootcampId" element={<Bootcamp />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
