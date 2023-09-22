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

  generateRandomGrid() {
    // const characters = ["S", "W", "P", "G", "A"];
    const grid = [];

    let wumpusCount = 0;
    let goldCount = 0;
    let pitCount = 0;

    for (let i = 0; i < this.GRID_SIZE; i++) {
      const row = [];
      for (let j = 0; j < this.GRID_SIZE; j++) {
        let randomChar = "S"; // Default to "S"

        // Place the agent in the bottom-left corner
        if (i === this.GRID_SIZE - 1 && j === 0) {
          randomChar = "A";
        } else {
          // Generate random values for other cells
          if (wumpusCount < 3 && Math.random() < 0.1) {
            randomChar = "W"; // Up to three wumpus
            wumpusCount++;
          } else if (goldCount < 3 && Math.random() < 0.1) {
            randomChar = "G"; // Up to three gold
            goldCount++;
          } else if (pitCount < 10 && Math.random() < 0.2) {
            randomChar = "P"; // Up to 10 pits
            pitCount++;
          }
        }

        row.push(randomChar);
      }
      grid.push(row);
    }

    console.log("GRID: ", this.grid);
    this.grid = this.deepCopy(grid);
    this.initialGrid = this.deepCopy(grid);
    console.log("New ", grid);

    return grid;
  }

  getBoard() {
    return this.grid;
  }

  setRandomBoard() {
    const newRandomBoard = this.generateRandomGrid();
    this.initialGrid = newRandomBoard;
    this.grid = this.deepCopy(newRandomBoard);
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
