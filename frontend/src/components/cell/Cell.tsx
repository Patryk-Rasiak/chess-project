import styles from "./Cell.module.scss";
import CellClass from "../../common/utils/createBoard.ts";
import { isLightSquare } from "../../common/utils/isLightSquare.ts";
import PropTypes from "prop-types";
import { Piece } from "../piece/Piece.tsx";
import { GameContext } from "../../common/providers/GameProvider.tsx";
import { useContext } from "react";
export const Cell = ({
  cell,
  index,
  playerColor,
  makeMove,
  setFromPos,
}: {
  cell: CellClass;
  index: number;
  playerColor: string;
  makeMove: (pos: string) => void;
  setFromPos: (pos: string, click?: boolean) => void;
}) => {
  // Check if cell is light or dark
  const light = isLightSquare(cell.pos, index, playerColor);

  // Checking if cell is a possible move
  const { possibleMoves, turn, check } = useContext(GameContext);
  const isPossibleMove = possibleMoves.includes(cell.pos);

  // Checking the color of the piece
  const color = cell.piece.toUpperCase() === cell.piece ? "w" : "b";

  const inCheck = (): boolean => {
    const king = cell.piece.toUpperCase() === "K";
    return turn === color && king && check;
  };
  const handleDrop = (): void => {
    makeMove(cell.pos);
  };

  const handleClick = (): void => {
    makeMove(cell.pos);
  };

  return (
    <div
      className={`${styles.cell} ${light ? styles.light : styles.dark}`}
      onDrop={handleDrop}
      onClick={handleClick}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        className={`${styles.overlay} ${
          isPossibleMove ? styles.possibleMove : ""
        } ${inCheck() && styles.check}`}
      >
        <Piece pos={cell.pos} name={cell.piece} setFromPos={setFromPos} />
      </div>
    </div>
  );
};

Cell.prototype = {
  cell: PropTypes.instanceOf(CellClass).isRequired,
  index: PropTypes.number.isRequired,
  playerColor: PropTypes.string,
  makeMove: PropTypes.func,
  setFromPos: PropTypes.func,
};
