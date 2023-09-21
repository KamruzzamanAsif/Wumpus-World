// src/components/Boards.js

export class Boards {
  constructor() {
    this.GRID_SIZE = 10;

    this.initialGrid = [
      ["S", "S", "S", "S", "S", "S", "S", "S", "P", "S"],
      ["S", "S", "W", "S", "S", "S", "W", "S", "S", "S"],
      ["S", "S", "S", "S", "G", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "P", "S", "S", "S"],
      ["S", "P", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "P", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "W", "S", "S", "S", "S"],
      ["S", "S", "S", "P", "S", "S", "S", "S", "S", "P"],
      ["S", "S", "S", "S", "P", "S", "S", "S", "G", "S"],
      ["A", "S", "S", "S", "S", "W", "S", "S", "S", "S"],
    ];

    this.grid = this.deepCopy(this.initialGrid);
  }

  deepCopy(grid) {
    return grid.map((row) => [...row]);
  }

  getBoard() {
    return this.grid;
  }

  resetBoard() {
    // without deep copy, we can't reset the board state
    this.grid = this.deepCopy(this.initialGrid);
  }

  getCurrentPosition(element) {
    let rowIndex = -1;
    let colIndex = -1;
    let gameBoard = this.getBoard();

    for (let i = 0; i < this.GRID_SIZE; i++) {
      const row = gameBoard[i];
      if (row.includes(element)) {
        rowIndex = i;
        colIndex = row.indexOf("A");
        break; // Found 'A', so break out of the loop
      }
    }

    return { rowIndex, colIndex };
  }

  makeMove(target_x, target_y, current_x, current_y) {
    const gameBoard = this.getBoard();

    // Ensure the current position is within bounds
    if (
      current_x >= 0 &&
      current_x < this.GRID_SIZE &&
      current_y >= 0 &&
      current_y < this.GRID_SIZE
    ) {
      // Ensure the target position is within bounds
      if (
        target_x >= 0 &&
        target_x < this.GRID_SIZE &&
        target_y >= 0 &&
        target_y < this.GRID_SIZE
      ) {
        // Swap the current position with the target position
        const temp = gameBoard[current_x][current_y];
        gameBoard[current_x][current_y] = gameBoard[target_x][target_y];
        gameBoard[target_x][target_y] = temp;

        return true; // Move is valid
      } else {
        console.error("Target position is out of bounds.");
        return false; // Target position is out of bounds
      }
    } else {
      console.error("Current position is out of bounds.");
      return false; // Current position is out of bounds
    }
  }
}

export const boards = new Boards();
