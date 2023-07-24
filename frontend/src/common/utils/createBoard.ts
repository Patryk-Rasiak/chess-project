export default class CellClass {
  pos: string;
  piece: string;
  constructor(pos: string, piece: string) {
    this.pos = pos;
    this.piece = piece;
  }
}

export const createBoard = (fenString: string, black: boolean) => {
  const fen = fenString.split(" ")[0];
  const fenPieces = fen.split("/").join("");

  const pieces: Array<string | string[]> = Array.from(fenPieces);

  Array.from(fenPieces).forEach((item, index) => {
    if (isFinite(item as any)) {
      const count = Number(item);
      const emptyArray: string[] = Array(count).fill("");
      pieces.splice(index, 1, emptyArray);
    }
  });

  const resultPieces = pieces.flat();

  // Getting reversed rows - ["8", "7", "6", "5", "4", "3", "2", "1"]
  const rows = Array.from({ length: 8 }, (_, index) => (8 - index).toString());
  const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

  if (black) {
    rows.reverse();
    columns.reverse();
    resultPieces.reverse();
  }

  const cells = []; // [a1, b1, c1..., h8]
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      cells.push(columns[j] + rows[i]);
    }
  }

  // Creating a cell object out of each cell data
  const board = cells.map((cell, index) => {
    return new CellClass(cell, resultPieces[index]);
  });
  return board;
};
