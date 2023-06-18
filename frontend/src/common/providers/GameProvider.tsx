import { createContext, PropsWithChildren, useReducer } from "react";
import { GameReducer } from "./GameReducer.ts";

type GameState = {
  possibleMoves: string[];
  dispatch: any;
  turn: string;
  check: boolean;
  gameOver: boolean;
  status: string;
};

const initialState: GameState = {
  possibleMoves: [],
  dispatch: () => null,
  turn: "w",
  check: false,
  gameOver: false,
  status: "",
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
