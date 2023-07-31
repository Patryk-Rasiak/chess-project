import { types } from "./actions.ts";

const getPositions = (moves: string[], color: string) => {
  let specialMoves: { [key: string]: string };
  if (color === "w") {
    specialMoves = {
      "O-O": "g1",
      "O-O-O": "c1",
    };
  } else {
    specialMoves = {
      "O-O": "g8",
      "O-O-O": "c8",
    };
  }

  const positions = moves.map((move) => {
    const indexOfEquals = move.indexOf("=");
    if (indexOfEquals !== -1) {
      return move.substring(indexOfEquals - 2, indexOfEquals);
    }

    const n =
      move.endsWith("+") || move.endsWith("#") ? move.length - 1 : move.length;
    return specialMoves[move] || move.substring(n - 2, n);
  });

  return [...new Set(positions)];
};

export const GameReducer = (
  state: {
    possibleMoves: string[];
    turn: string;
    check: boolean;
    status: string;
    gameOver: boolean;
    playerName: string;
    playerColor: string;
    opponentName: string;
    movesCount: number;
    gameInProgress: boolean;
  },
  action: {
    type: string;
    moves: string[];
    player: string;
    check: boolean;
    status: string;
    playerName: string;
    opponentName: string;
    color: string;
    turn: string;
    gameOver: boolean;
  }
) => {
  switch (action.type) {
    case types.SET_POSSIBLE_MOVES:
      return {
        ...state,
        possibleMoves: getPositions(action.moves, state.playerColor),
      };
    case types.CLEAR_POSSIBLE_MOVES:
      return {
        ...state,
        possibleMoves: [],
      };
    case types.SET_TURN:
      return {
        ...state,
        turn: action.player,
        check: action.check,
        movesCount: state.movesCount + 1,
      };
    case types.OPPONENT_MOVED:
      return {
        ...state,
        movesCount: state.movesCount + 1,
      };
    case types.START_GAME:
      return {
        ...state,
        gameInProgress: true,
      };
    case types.SET_GAME_OVER:
      return {
        ...state,
        gameOver: true,
        status: action.status,
        turn: action.player,
        gameInProgress: false,
      };
    case types.RESET_GAME:
      return {
        possibleMoves: [],
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
    case types.SET_PLAYER:
      return { ...state, playerName: action.playerName };
    case types.SET_PLAYER_COLOR:
      return { ...state, playerColor: action.color };
    case types.SET_OPPONENT:
      return { ...state, opponentName: action.opponentName };
    default:
      return state;
  }
};
