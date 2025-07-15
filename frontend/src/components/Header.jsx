import React, { useState } from "react";
import { Link } from "react-router-dom";
import hamburger from "../assets/hamburgericon.png";
import "../styles/Header.scss";

const Header = ({ logout, isLoggedIn }) => {
  const [toggle, setToggle] = useState("");

  const handleToggleClick = () => {
    setToggle(toggle === "" ? "open" : "");
  };

  const handleLinkClick = () => {
    setToggle(""); // close dropdown
  };

  return (
    <nav className="mynavbar">
      <div className="logo">
        <Link to="/">InsightXray</Link>
      </div>

      <ul className="links">
        <li>
          <Link to="/login">Scan Chest X-ray</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
      </ul>

      {isLoggedIn ? (
        <button className="action_btn" onClick={logout}>
          Logout
        </button>
      ) : (
        <Link className="action_btn" to="/login">
          Login
        </Link>
      )}

      <div className="toggle_btn" onClick={handleToggleClick}>
        <img src={hamburger} height="40px" alt="menu" />
      </div>

      <div className={`dropdown_menu ${toggle}`}>
        <li>
          <Link onClick={handleLinkClick} to="/login">
            Scan X-ray
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkClick} to="/aboutUs">
            About Us
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkClick} to="/feedback">
            Feedback
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button className="action_btn" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link className="action_btn" to="/login">
              Login
            </Link>
          )}
        </li>
      </div>
    </nav>
  );
};

export default Header;
