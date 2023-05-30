import React from "react";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Main screen</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar
          congue justo, sed condimentum massa sollicitudin quis. Mauris mauris
          leo, consequat in lectus ut, viverra ornare felis. Nullam ac blandit
          leo. Duis non arcu et nibh dapibus accumsan et at leo. Duis finibus
          purus et urna pretium, a cursus risus.
        </p>
      </div>
    </div>
  );
};
