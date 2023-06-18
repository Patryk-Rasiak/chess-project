import { GameContext } from "../../common/providers/GameProvider.tsx";
import { useContext } from "react";
import React from "react";
import styles from "./GameOver.module.scss";
import { Link } from "react-router-dom";

export const GameOver = () => {
  const { status, turn } = useContext(GameContext);

  let winner = "";
  if (status === "checkmate") {
    if (turn === "b") {
      winner = "white";
    } else {
      winner = "black";
    }
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
