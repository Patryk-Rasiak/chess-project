import React from "react";
import styles from "./MatchHistory.module.scss";
import { joinClasses } from "../../common/utils/joinClasses.ts";
import { Link } from "react-router-dom";

interface IGame {
  type: string;
  opponent: string;
  date: string;
  moves: string;
  review: string;
  result: string;
}

interface MatchHistoryProps {
  gamesHistory: IGame[];
}

export const MatchHistory = ({ gamesHistory }: MatchHistoryProps) => {
  let body;
  if (gamesHistory.length === 0) {
    body = (
      <div className={styles.emptyRow}>
        <p>No games played yet</p>
      </div>
    );
  } else {
    body = gamesHistory.map((game: IGame) => {
      let resultClass;
      if (game.result === "win") {
        resultClass = styles.win;
      } else if (game.result === "loss") {
        resultClass = styles.loss;
      } else {
        resultClass = styles.draw;
      }
      return (
        <div className={joinClasses(styles.row, resultClass)}>
          <p>{game.type}</p>
          <p>{game.opponent}</p>
          <p>{game.date}</p>
          <p>{game.moves}</p>
          <p>
            <Link to={"/review"} id={game.review}>
              Analyze
            </Link>
          </p>
        </div>
      );
    });
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Match History</h1>
      <div className={styles.table}>
        <div className={styles.thead}>
          <p>Type</p>
          <p>Opponent</p>
          <p>Date</p>
          <p>Moves</p>
          <p>Review</p>
        </div>
        <div className={styles.tbody}>{body}</div>
      </div>
    </div>
  );
};
