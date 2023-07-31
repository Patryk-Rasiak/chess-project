export const types = {
  SET_POSSIBLE_MOVES: "SET_POSSIBLE_MOVES",
  CLEAR_POSSIBLE_MOVES: "CLEAR_POSSIBLE_MOVES",
  SET_TURN: "SET_TURN",
  OPPONENT_MOVED: "OPPONENT_MOVED",
  SET_GAME_OVER: "SET_GAME_OVER",
  SET_PLAYER_COLOR: "SET_PLAYER_COLOR",
  SET_PLAYER: "SET_PLAYER",
  SET_OPPONENT: "SET_OPPONENT",
  START_GAME: "START_GAME",
  RESET_GAME: "RESET_GAME",
};

interface IPlayer {
  name: string;
  color: string;
  player_id: string;
  game_id: string;
}
export const setPlayer = (name: string) => ({
  type: types.SET_PLAYER,
  name: name,
});

export const setOpponent = (opponent: IPlayer) => ({
  type: types.SET_OPPONENT,
  opponentName: opponent?.name,
});

export const setPlayerColor = (color: string) => ({
  type: types.SET_PLAYER_COLOR,
  color: color,
});

export const setPossibleMoves = (moves: string[]) => ({
  type: types.SET_POSSIBLE_MOVES,
  moves: moves,
});

export const clearPossibleMoves = () => ({
  type: types.CLEAR_POSSIBLE_MOVES,
});

export const setTurn = (player: string, check: boolean) => ({
  type: types.SET_TURN,
  player: player,
  check: check,
});

export const setGameOver = (player: string, status: string) => ({
  type: types.SET_GAME_OVER,
  player: player,
  status: status,
});
