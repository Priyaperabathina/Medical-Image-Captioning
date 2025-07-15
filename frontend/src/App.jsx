import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import User from "./pages/User";
import Feedback from "./pages/Feedback";
import Report from "./pages/Report";
import Reportrecent from "./pages/Reportrecent";
import Allreports from "./pages/Allreports";
import Notfound from "./components/Notfound";
import Footer from "./components/Footer";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (cookies.token) {
        try {
          const { data } = await axios.post(
            "http://localhost:4000/auth",
            {},
            { withCredentials: true }
          );
          if (data.status === true) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (err) {
          console.error("Auth check failed:", err);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [cookies.token]);

  const handleLogout = () => {
    removeCookie("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} logout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User isLoggedIn={isLoggedIn} />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/report" element={<Report isLoggedIn={isLoggedIn} />} />
        <Route
          path="/reportrecent"
          element={<Reportrecent isLoggedIn={isLoggedIn} />}
        />
        <Route path="/allreports" element={<Allreports />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
