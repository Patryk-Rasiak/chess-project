import CellClass from "../../common/utils/createBoard.ts";
import styles from "./Board.module.scss";
import { Cell } from "../cell/Cell.tsx";
import PropTypes from "prop-types";

export const Board = ({
  cells,
  playerColor,
  ...props
}: {
  cells: CellClass[];
  playerColor: string;
  makeMove: (pos: string) => void;
  setFromPos: (pos: string, click?: boolean) => void;
}) => {
  return (
    <div className={styles.board}>
      {cells.map((cell: CellClass, index) => (
        <Cell
          cell={cell}
          index={index}
          playerColor={playerColor}
          key={cell.pos}
          {...props}
        />
      ))}
    </div>
  );
};

Board.prototype = {
  cells: PropTypes.array.isRequired,
  playerColor: PropTypes.string,
  makeMove: PropTypes.func,
  setFromPos: PropTypes.func,
};
