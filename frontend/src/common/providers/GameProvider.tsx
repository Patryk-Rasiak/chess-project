import { createContext, PropsWithChildren, useReducer } from "react";
import { GameReducer } from "./GameReducer.ts";

type GameState = {
  possibleMoves: string[];
  dispatch: any;
  turn: string;
  check: boolean;
  gameOver: boolean;
  status: string;
  playerName: string;
  playerColor: string;
  opponentName: string;
  movesCount: number;
  gameInProgress: boolean;
};

const initialState: GameState = {
  possibleMoves: [],
  dispatch: () => null,
  turn: "w",
  check: false,
  gameOver: false,
  status: "",
  playerName: "",
  playerColor: "",
  opponentName: "",
  movesCount: 0,
  gameInProgress: false,
};

export const GameContext = createContext(initialState);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
