import React from "react";
import styles from "./NavbarAuth.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export const NavbarAuth = () => {
  const navigate = useNavigate();
  const userStr = window.localStorage.getItem("authUser");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    window.localStorage.removeItem("authUser");
    navigate("/login");
  };

  if (user) {
    return (
      <div className={styles.dropdown}>
        <span>{user.username}</span>
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
    <div className={styles.right}>
      <Link to={"login"} id={styles.signin}>
        Sign In
      </Link>
      <Link to={"signup"}>Sign Up</Link>
    </div>
  );
};
