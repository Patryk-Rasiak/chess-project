import React from "react";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Welcome to Chess!</h1>
        <p>
          Unleash your strategic prowess and dive into the captivating world of
          chess. Whether you're a seasoned grandmaster or just starting your
          journey, Chess is your ultimate destination.
        </p>
      </div>
    </div>
  );
};
