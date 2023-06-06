import React, { useEffect } from "react";
import styles from "./SignUp.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userStr = window.localStorage.getItem("authUser");
    const user = userStr ? JSON.parse(userStr) : null;

    if (user) {
      navigate("/");
      return;
    }
  }, []);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const data = new FormData(
      document.getElementById("form") as HTMLFormElement
    );
    console.log(data.get("password"));
    console.log(data.get("confirm-password"));
    if (data.get("password") !== data.get("confirm-password")) {
      toast.error("Passwords do not match!", {
        toastId: "passwords-dont-match",
      });
      return;
    }

    axios
      .post("http://localhost:8000/users", {
        id: 4,
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
        profile: {
          ranking_bullet: 0,
          ranking_blitz: 0,
          ranking_rapid: 0,
          games_played: 0,
          games_history: [],
        },
      })
      .then((response) => {
        console.log(response);
      });

    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Sign Up</h1>
        <form id="form">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" name="username" required />
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" name="email" required />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
            required
          />
          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
        <div className={styles.switch}>
          <p>Already have an account? </p>
          <Link to={"/login"}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};
