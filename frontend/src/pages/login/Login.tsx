import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { IToken } from "../../common/interfaces/IToken.ts";
import { UsernameContext } from "../../common/providers/UsernameProvider.tsx";

export const Login = () => {
  const { username, setUsername } = useContext(UsernameContext);
  const navigate = useNavigate();
  const [formUsername, setFormUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("jwtToken");

    if (token) {
      navigate("/");
      return;
    }
  }, []);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/auth/login/", {
        username: formUsername,
        password: password,
      })
      .then((response) => {
        const {
          access_token,
          refresh_token,
          owner_id,
          access_token_expiry,
          refresh_token_expiry,
        } = response.data;

        const token: IToken = {
          ownerId: owner_id,
          accessToken: access_token,
          refreshToken: refresh_token,
          accessTokenExpiry: access_token_expiry,
          refreshTokenExpiry: refresh_token_expiry,
        };

        // Retrieving user's username
        axios
          .get("http://localhost:8000/auth/username/", {
            headers: { Authorization: "Bearer " + access_token },
          })
          .then((response) => {
            setUsername(response.data.username);
          });

        localStorage.setItem("jwtToken", JSON.stringify(token));
        toast.success("Successfully logged in!", { toastId: "logged-in" });
        navigate("/");
      })
      .catch(() => {
        toast.error("Invalid credentials", { toastId: "invalid-credentials" });
        return;
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Sign In</h1>
        <form id="form">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => setFormUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
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
