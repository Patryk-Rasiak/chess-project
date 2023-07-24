import styles from "./GamePanel.module.scss";
import { useContext, useEffect, useState } from "react";
import { types } from "../../common/providers/actions.ts";
import { GameContext } from "../../common/providers/GameProvider.tsx";

export const GamePanel = ({
  username,
  opponent,
  myTurn,
}: {
  username: string | undefined;
  opponent: string;
  myTurn: boolean | undefined;
}) => {
  const { dispatch, playerColor, gameOver } = useContext(GameContext);
  const [playerTimer, setPlayerTimer] = useState(600);
  const [opponentTimer, setOpponentTimer] = useState(600);

  // Updating timers
  useEffect(() => {
    let playerCountdownInterval: NodeJS.Timeout | undefined;
    let opponentCountdownInterval: NodeJS.Timeout | undefined;

    if (myTurn === true) {
      playerCountdownInterval = setInterval(() => {
        setPlayerTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (myTurn === false) {
      opponentCountdownInterval = setInterval(() => {
        setOpponentTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(playerCountdownInterval);
      clearInterval(opponentCountdownInterval);
    }

    if (gameOver) {
      clearInterval(playerCountdownInterval);
      clearInterval(opponentCountdownInterval);
    }

    return () => {
      clearInterval(playerCountdownInterval);
      clearInterval(opponentCountdownInterval);
    };
  }, [myTurn]);

  // Checking if time is up
  useEffect(() => {
    if (playerTimer === -1) {
      dispatch({
        type: types.SET_GAME_OVER,
        status: "time",
        player: playerColor === "w" ? "b" : "w",
      });
    } else if (opponentTimer === 0) {
      dispatch({
        type: types.SET_GAME_OVER,
        status: "time",
        player: playerColor,
      });
    }
  }, [playerTimer, opponentTimer]);

  // Formatting timers to mm:ss
  const formatTimer = (timer: number): string => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={styles.content}>
      <div className={styles.opponentInfo}>
        <span className={styles.username}>
          {opponent ? opponent : "Waiting for an opponent.."}
        </span>
        <span className={styles.timer}>{formatTimer(opponentTimer)}</span>
      </div>
      <div className={styles.playerInfo}>
        <span className={styles.timer}>{formatTimer(playerTimer)}</span>
        <span className={styles.username}>{username}</span>
      </div>
    </div>
  );
};
