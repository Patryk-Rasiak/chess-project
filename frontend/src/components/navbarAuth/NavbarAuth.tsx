import React, { useContext } from "react";
import styles from "./NavbarAuth.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { UsernameContext } from "../../common/providers/UsernameProvider.tsx";

export const NavbarAuth = () => {
  const { username, setUsername } = useContext(UsernameContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("jwtToken");
    setUsername(null);
    navigate("/login");
  };

  if (username) {
    return (
      <div className={styles.dropdown}>
        <span>{username}</span>
        <div className={styles.dropdownContent}>
          <Link to={"/profile"}>Profile</Link>
          <button className={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.auth}>
      <Link to={"login"} id={styles.signin}>
        Sign In
      </Link>
      <Link to={"signup"}>Sign Up</Link>
    </div>
  );
};
