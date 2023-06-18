import { Chess } from "chess.js";

export const getGameOverState = (chess: Chess) => {
  if (chess.isCheckmate()) {
    return [true, "checkmate"];
  }
  if (chess.isStalemate()) {
    return [true, "stalemate"];
  }
  if (chess.isThreefoldRepetition()) {
    return [true, "threefold repetition"];
  }
  if (chess.isDraw()) {
    return [true, "draw"];
  }
  if (chess.isInsufficientMaterial()) {
    return [true, "insufficient material"];
  }
  return [false, ""];
};
