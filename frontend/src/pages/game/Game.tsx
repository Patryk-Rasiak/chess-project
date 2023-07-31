import { createBoard } from "../../common/utils/createBoard.ts";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Board } from "../../components/board/Board.tsx";
import { Chess, Square } from "chess.js";
import { GameContext } from "../../common/providers/GameProvider.tsx";
import { types } from "../../common/providers/actions.ts";
import { getGameOverState } from "../../common/utils/gameOver.ts";
import { GameOver } from "../../components/gameOver/GameOver.tsx";
import { GamePanel } from "../../components/gamePanel/GamePanel.tsx";
import styles from "./Game.module.scss";
import { getJwtToken } from "../../common/utils/getJwtToken.ts";

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const Game = () => {
  // Getting data from the context
  const {
    dispatch,
    playerColor,
    status,
    movesCount,
    opponentName,
    gameOver,
    possibleMoves,
    gameInProgress,
  } = useContext(GameContext);
  const [fen, setFen] = useState(FEN);
  const chess = useRef(new Chess(fen)).current;
  const [myTurn, setMyTurn] = useState<boolean | undefined>(undefined);
  const [board, setBoard] = useState(createBoard(FEN, false));
  const [clicked, setClicked] = useState(false);
  const token = getJwtToken();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const fromPos = useRef("");

  // Updating a board each time a player makes a move
  useEffect(() => {
    setBoard(createBoard(fen, playerColor === "b"));
  }, [fen, playerColor]);

  // Manage socket connection
  useEffect(() => {
    if (!token) return;
    const socket = new WebSocket(`ws://localhost:8000/game/`);
    setSocket(socket);

    // Joining a game
    socket.onopen = () => {
      const data = {
        name: token.ownerUsername,
        userID: token.ownerId,
      };

      // Sending a message to the server
      const joinEvent = {
        type: "join",
        data: data,
      };
      socket.send(JSON.stringify(joinEvent));
    };

    return () => {
      const leaveEvent = {
        type: "quit",
      };
      dispatch({ type: types.RESET_GAME });

      socket.send(JSON.stringify(leaveEvent));
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    // Receiving messages from the server
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      switch (eventData.type) {
        // Starting a game
        case "startGame": {
          let opponent;
          if (token?.ownerId === eventData.data.whitePlayer.player_id) {
            opponent = eventData.data.blackPlayer;
            dispatch({ type: types.SET_PLAYER_COLOR, color: "w" });
          } else {
            opponent = eventData.data.whitePlayer;
            dispatch({ type: types.SET_PLAYER_COLOR, color: "b" });
          }
          dispatch({ type: types.SET_OPPONENT, opponentName: opponent.name });
          dispatch({ type: types.START_GAME });

          break;
        }

        // Opponent made a move
        case "opponentMove": {
          const { from, to } = eventData.data;

          chess.move({ from: from, to: to, promotion: "q" });
          setMyTurn(playerColor === chess.turn());

          setFen(chess.fen());
          break;
        }

        // Opponent left the game
        case "opponentLeft": {
          dispatch({
            type: types.SET_GAME_OVER,
            status: "resignation",
            player: playerColor,
          });

          break;
        }

        default:
          console.log("Unknown event:", eventData);
          break;
      }
    };
  }, [chess, playerColor, gameInProgress, socket]);

  // Making a move
  const makeMove = (pos: string) => {
    if (!socket) return;

    // If it's not my turn or move is invalid, don't do anything
    if (chess.turn() !== playerColor || !possibleMoves.includes(pos)) return;

    const from: string = fromPos.current;
    const to = pos;

    // Make a move
    chess.move({ from: from, to: to, promotion: "q" });

    // Clear the possible moves and update the board
    dispatch({ type: types.CLEAR_POSSIBLE_MOVES });
    setFen(chess.fen());

    // Update the turn
    setMyTurn(playerColor === chess.turn());

    // Check if the game is over
    const [gameOver, status] = getGameOverState(chess) as [boolean, string];
    if (gameOver) {
      dispatch({ type: types.SET_GAME_OVER, status, player: chess.turn() });
      return;
    }

    dispatch({
      type: types.SET_TURN,
      player: chess.turn(),
      check: chess.inCheck(),
    });

    // Send a message to the server
    const moveEvent = {
      type: "move",
      data: {
        from: from,
        to: to,
      },
    };
    socket.send(JSON.stringify(moveEvent));
  };

  // Setting the position from which the player wants to move
  const setFromPos = (pos: string, click = false) => {
    // If it's not my turn, don't do anything
    if (chess.turn() !== playerColor) return;

    // If the player clicked on the same square twice, clear the possible moves
    if (click && clicked) {
      fromPos.current = "";
      dispatch({ type: types.CLEAR_POSSIBLE_MOVES });
      setClicked(false);
      return;
    } else if (click) {
      setClicked(true);
    }

    fromPos.current = pos;
    const moves = chess.moves({ square: pos as Square });

    dispatch({ type: types.CLEAR_POSSIBLE_MOVES });
    dispatch({
      type: types.SET_POSSIBLE_MOVES,
      moves: moves,
    });
  };

  // If the game is over, send the result to the server
  if (gameOver) {
    const resultEvent = {
      type: "gameOver",
      data: {
        status: status,
        turn: chess.turn(),
        moves: movesCount,
      },
    };

    socket?.send(JSON.stringify(resultEvent));
  }

  return (
    <div className={styles.container}>
      {gameOver && <GameOver />}
      <Board
        cells={board}
        playerColor={playerColor}
        makeMove={makeMove}
        setFromPos={setFromPos}
      />
      <GamePanel
        myTurn={myTurn}
        username={token?.ownerUsername}
        opponent={opponentName}
      />
    </div>
  );
};
