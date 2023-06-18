import { types } from "./actions.ts";

const getPositions = (moves: string[]) => {
  return moves.map((move) => {
    const n = move.length;
    return move.substring(n - 2);
  });
};

export const GameReducer = (
  state: {
    possibleMoves: string[];
    turn: string;
    check: boolean;
    status: string;
    gameOver: boolean;
  },
  action: {
    type: string;
    moves: string[];
    player: string;
    check: boolean;
    status: string;
  }
) => {
  switch (action.type) {
    case types.SET_POSSIBLE_MOVES:
      return {
        ...state,
        possibleMoves: getPositions(action.moves),
      };
    case types.CLEAR_POSSIBLE_MOVES:
      return {
        ...state,
        possibleMoves: [],
      };
    case types.SET_TURN:
      return { ...state, turn: action.player, check: action.check };
    case types.GAME_OVER:
      return {
        ...state,
        gameOver: true,
        status: action.status,
        turn: action.player,
      };
    default:
      return state;
  }
};
