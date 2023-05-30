import React from "react";
import styles from "./SignUp.module.scss";
import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Sign Up</h1>
        <form>
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
            name="password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className={styles.switch}>
          <p>Don't have an account? </p>
          <Link to={"/login"}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};
