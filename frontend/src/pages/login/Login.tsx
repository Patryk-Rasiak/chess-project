import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { IToken } from "../../common/interfaces/IToken.ts";
import { getJwtToken } from "../../common/utils/getJwtToken.ts";

export const Login = () => {
  const navigate = useNavigate();
  const [formUsername, setFormUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const jwtToken = getJwtToken();

    if (jwtToken) {
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
        const { owner_id, owner_username, access_token, refresh_token } =
          response.data;

        const token: IToken = {
          ownerId: owner_id,
          ownerUsername: owner_username,
          accessToken: access_token,
          refreshToken: refresh_token,
        };

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
