import { GameContext } from "../../common/providers/GameProvider.tsx";
import { useContext } from "react";
import React from "react";
import styles from "./GameOver.module.scss";
import { Link } from "react-router-dom";

export const GameOver = () => {
  const { status, turn } = useContext(GameContext);

  let winner = "";

  // Evaluating the winner
  if (["checkmate"].includes(status)) {
    winner = turn === "w" ? "black" : "white";
  } else if (["time", "resignation"].includes(status)) {
    winner = turn === "w" ? "white" : "black";
  }

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <h1>Game over</h1>
        <p>
          The game ended in a <mark>{status}</mark>
        </p>
        {winner && (
          <p>
            <mark>{winner}</mark> won
          </p>
        )}
        <Link to={"/"} className={styles.button}>
          Main menu
        </Link>
      </div>
    </>
  );
};
