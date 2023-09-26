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

export function move() {
  const board = boards;
  let nextMove = true;
  let randomMove = 0;

  const { rowIndex, colIndex } = board.getCurrentPosition("A");

  // TODO: We have to replace this random move with Logical Move

  const safeMove = boards.findSafeCells(rowIndex, colIndex);

  if (safeMove.length != 0) {
    
    let next_x, next_y;
    const size = safeMove.length;
    randomMove = Math.floor(Math.random() * size);
    next_x = safeMove[randomMove].new_x;
    next_y = safeMove[randomMove].new_y;

    // next move
    nextMove = board.makeMove(next_x, next_y, rowIndex, colIndex);
    console.log("CUR: ", next_x, next_y ,board.initialGrid[next_x][next_y]);

    if (board.initialGrid[next_x][next_y] == "G") {
      console.log("GOLD FOUND", next_x, next_y);
    }

    
  } else {

    randomMove = Math.floor(Math.random() * 4);
    switch (randomMove) {
      case 0:
        if (isValidMove(rowIndex + 1, colIndex, rowIndex, colIndex)) {
          nextMove = board.makeMove(rowIndex + 1, colIndex, rowIndex, colIndex);
        }
        break;

      case 1:
        if (isValidMove(rowIndex - 1, colIndex, rowIndex, colIndex)) {
          nextMove = board.makeMove(rowIndex - 1, colIndex, rowIndex, colIndex);
        }
        break;

      case 2:
        if (isValidMove(rowIndex, colIndex + 1, rowIndex, colIndex)) {
          nextMove = board.makeMove(rowIndex, colIndex + 1, rowIndex, colIndex);
        }
        break;

      case 3:
        if (isValidMove(rowIndex, colIndex - 1, rowIndex, colIndex)) {
          nextMove = board.makeMove(rowIndex, colIndex - 1, rowIndex, colIndex);
        }
        break;
    }
    
  }

  return !nextMove;
}
