import { createBoard } from "../../common/utils/createBoard.ts";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Board } from "../../components/board/Board.tsx";
import { Chess, Square } from "chess.js";
import { GameContext } from "../../common/providers/GameProvider.tsx";
import { types } from "../../common/providers/actions.ts";
import { getGameOverState } from "../../common/utils/gameOver.ts";
import { GameOver } from "../../components/gameOver/GameOver.tsx";

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
export const Game = () => {
  const { dispatch, gameOver } = useContext(GameContext);
  const [fen, setFen] = useState(FEN);
  const chess = useRef(new Chess(fen)).current;
  const [board, setBoard] = useState(createBoard(FEN));
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setBoard(createBoard(fen));
  }, [fen]);

  useEffect(() => {
    const [gameOver, status] = getGameOverState(chess);
    if (gameOver) {
      dispatch({ type: types.GAME_OVER, status, player: chess.turn() });
      setIsGameOver(true);
    } else {
      setIsGameOver(false);
    }
    dispatch({
      type: types.SET_TURN,
      player: chess.turn(),
      check: chess.inCheck(),
    });
  }, [fen, dispatch, chess]);

  const fromPos = useRef("");

  const makeMove = (pos: string) => {
    const from: string = fromPos.current;
    const to = pos;
    chess.move({ from, to });
    dispatch({ type: types.CLEAR_POSSIBLE_MOVES });
    setFen(chess.fen());
  };

  const setFromPos = (pos: string) => {
    fromPos.current = pos;
    dispatch({
      type: types.SET_POSSIBLE_MOVES,
      moves: chess.moves({ square: pos as Square }),
    });
  };

  if (isGameOver) {
    return (
      <div>
        <GameOver />
        <Board cells={board} makeMove={makeMove} setFromPos={setFromPos} />
      </div>
    );
  }

  return (
    <div>
      <Board cells={board} makeMove={makeMove} setFromPos={setFromPos} />
    </div>
  );
};
