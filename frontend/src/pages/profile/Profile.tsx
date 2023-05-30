import React from "react";
import { useNavigate } from "react-router";
import styles from "./Profile.module.scss";
export const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("authUser") || "{}");
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{user.username}</h1>
      </div>
    </div>
  );
};
