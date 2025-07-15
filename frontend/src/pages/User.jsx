import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import FileUpload from "../components/FileUpload";
// import Addinfo from "../components/Addinfo";
import RecentsTab from "../components/RecentsTab";
import { useRef } from "react";
import "../styles/usertest.scss";

const User = ({ isLoggedIn }) => {
  const hasGreeted = useRef(false);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/auth",
          {},
          { withCredentials: true }
        );
        console.log("auth response", data);

        const { status, user } = data;
        if (!status) {
          navigate("/login");
        } else {
          setUsername(user);
          // toast(`Hello ${user}`, { position: "top-right" });
          if (!hasGreeted.current) {
            toast(`Hello ${user}`, { position: "top-right" });
            hasGreeted.current = true;
          }
        }
      } catch (err) {
        console.error("Auth check failed", err);
        navigate("/login");
      }
    };

    verifyCookie();
  }, [navigate]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  const handleClick = () => {
    navigate("/allreports", { state: { username: username } });
  };
  return (
    <>
      <Header isLoggedIn={isLoggedIn} logout={handleLogout} />
      <div className="home_page">
        <h4>
          Welcome back <span>{username ? username.toUpperCase() : "..."}</span>
        </h4>
        <div className="layout">
          <div className="leftlayout">
            <div className="allreports" onClick={handleClick}>
              <h5>All reports</h5>
            </div>
            <div className="recent-header">
              <h5></h5>
            </div>
            <div className="recent-tab">
              <RecentsTab username={username} />
            </div>
          </div>
          <div className="file-upload">
            <FileUpload username={username} />
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
