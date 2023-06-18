import CellClass from "../../common/utils/createBoard.ts";
import styles from "./Board.module.scss";
import { Cell } from "../cell/Cell.tsx";
import PropTypes from "prop-types";

export const Board = ({
  cells,
  ...props
}: {
  cells: CellClass[];
  makeMove: (pos: string) => void;
  setFromPos: (pos: string) => void;
}) => {
  return (
    <div className={styles.board}>
      {cells.map((cell: CellClass, index) => (
        <Cell cell={cell} index={index} key={cell.pos} {...props} />
      ))}
    </div>
  );
};

Board.prototype = {
  cells: PropTypes.array.isRequired,
  makeMove: PropTypes.func,
  setFromPos: PropTypes.func,
};
