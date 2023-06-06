import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userStr = window.localStorage.getItem("authUser");
    const user = userStr ? JSON.parse(userStr) : null;

    if (user) {
      navigate("/");
      return;
    }
    axios.get("http://localhost:8000/users").then((response) => {
      setUsers(response.data);
    });
  }, []);
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const data = new FormData(
      document.getElementById("form") as HTMLFormElement
    );

    const user = users.find((user: any) => {
      return (
        user.email === data.get("email") &&
        user.password === data.get("password")
      );
    });

    if (!user) {
      toast.error("Invalid credentials", { toastId: "invalid-credentials" });
      return;
    }

    toast.success("Successfully logged in!", { toastId: "logged-in" });
    window.localStorage.setItem("authUser", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Sign In</h1>
        <form id="form">
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" name="email" required />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button type="submit" onClick={handleSubmit}>
            Sign In
          </button>
        </form>
        <div className={styles.switch}>
          <p>Don't have an account? </p>
          <Link to={"/signup"}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
