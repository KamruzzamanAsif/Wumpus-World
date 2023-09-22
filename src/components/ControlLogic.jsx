import { boards } from "./Boards";

const BOARD_SIZE = 10;

export function isValidMove(board_x, board_y, current_x, current_y) {
  let isValid = false;
  if (
    board_x >= 0 &&
    board_x < BOARD_SIZE &&
    board_y >= 0 &&
    board_y < BOARD_SIZE
  ) {
    const distance =
      Math.abs(board_x - current_x) + Math.abs(board_y - current_y);
    if (distance === 1 && (board_x !== current_x || board_y !== current_y)) {
      isValid = true;
    }
  }

  return isValid;
}

export function newMove() {
  const { rowIndex, colIndex } = boards.getCurrentPosition("A");
  const safeCells = boards.findSafeCells(rowIndex, colIndex);
  console.log(boards.getBoard());
  console.log("CUR: ", { rowIndex, colIndex });
  console.log("SAFE: ", safeCells);
}

export function move() {
  const board = boards;

  const { rowIndex, colIndex } = board.getCurrentPosition("A");

  // TODO: We have to replace this random move with Logical Move 
  const randomMove = Math.floor(Math.random() * 4);

  newMove();

  switch (randomMove) {
    case 0:
      if (isValidMove(rowIndex + 1, colIndex, rowIndex, colIndex)) {
        board.makeMove(rowIndex + 1, colIndex, rowIndex, colIndex);
      }
      break;

    case 1:
      if (isValidMove(rowIndex - 1, colIndex, rowIndex, colIndex)) {
        board.makeMove(rowIndex - 1, colIndex, rowIndex, colIndex);
      }
      break;

    case 2:
      if (isValidMove(rowIndex, colIndex + 1, rowIndex, colIndex)) {
        board.makeMove(rowIndex, colIndex + 1, rowIndex, colIndex);
      }
      break;

    case 3:
      if (isValidMove(rowIndex, colIndex - 1, rowIndex, colIndex)) {
        board.makeMove(rowIndex, colIndex - 1, rowIndex, colIndex);
      }
      break;
  }
}
