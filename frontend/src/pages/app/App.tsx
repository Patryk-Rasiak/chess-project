import { useState } from "react";
import "./App.css";
import styles from "./App.module.scss";

const App = () => {
  const [count, setCount] = useState(0);
  setCount(count);

  return <div className={styles.container}>{count}</div>;
};

export default App;
