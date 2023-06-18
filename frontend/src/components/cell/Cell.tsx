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
  makeMove,
  setFromPos,
}: {
  cell: CellClass;
  index: number;
  makeMove: (pos: string) => void;
  setFromPos: (pos: string) => void;
}) => {
  const light = isLightSquare(cell.pos, index);

  const { possibleMoves, turn, check } = useContext(GameContext);
  const isPossibleMove = possibleMoves.includes(cell.pos);

  const color = cell.piece.toUpperCase() === cell.piece ? "w" : "b";

  const inCheck = () => {
    const king = cell.piece.toUpperCase() === "K";
    return turn === color && king && check;
  };
  const handleDrop = () => {
    makeMove(cell.pos);
  };

  return (
    <div
      className={`${styles.cell} ${light ? styles.light : styles.dark}`}
      onDrop={handleDrop}
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
  makeMove: PropTypes.func,
  setFromPos: PropTypes.func,
};
