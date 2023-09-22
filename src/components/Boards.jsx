// src/components/Boards.js

export class Boards {
  constructor() {
    this.BOARD_SIZE = 10;

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

    for (let i = 0; i < this.BOARD_SIZE; i++) {
      const row = [];
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        let randomChar = "S"; // Default to "S"

        // Place the agent in the bottom-left corner
        if (i === this.BOARD_SIZE - 1 && j === 0) {
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

    for (let i = 0; i < this.BOARD_SIZE; i++) {
      const row = gameBoard[i];
      if (row.includes(element)) {
        rowIndex = i;
        colIndex = row.indexOf("A");
        break; // Found 'A', so break out of the loop
      }
    }

    return { rowIndex, colIndex };
  }

  isValidAndSafe = (x, y) => {
    const board = this.getBoard();

    // Check if the cell is within the bounds of the board
    if (x >= 0 && x < this.BOARD_SIZE && y >= 0 && y < this.BOARD_SIZE) {
      // Check if the cell is safe (no Wumpus or pit)
      // TODO: Mark Breez or Stench for P or W (Fahad - UI)
      // TODO: Use inferential Logic here
      if (board[x][y] !== "W" && board[x][y] !== "P") {
        return true;
      }
    }
    return false;
  };

  // TODO: Find safe cell based on Inferential logic and Probabilistic Logic
  findSafeCells(current_x, current_y) {
    const safeCells = [];

    // Check the four adjacent cells for safety
    //! CHEATING...
    //? We need to sort out possible Pit or Wumpus without acc
    const directions = [
      [current_x + 1, current_y],
      [current_x - 1, current_y],
      [current_x, current_y + 1],
      [current_x, current_y - 1],
    ];

    for (const [new_x, new_y] of directions) {
      if (this.isValidAndSafe(new_x, new_y)) {
        safeCells.push({ new_x, new_y });
      }
    }

    return safeCells;
  }

  makeMove(target_x, target_y, current_x, current_y) {
    const gameBoard = this.getBoard();

    // Check if the target cell is safe
    if (this.isValidAndSafe(target_x, target_y)) {
      // Move the agent to the target position
      gameBoard[target_x][target_y] = "A";
      gameBoard[current_x][current_y] = "S";

      return true; // Move is valid
    } else {
      console.error("Invalid or unsafe move.");
      return false;
    }
  }
}

export const boards = new Boards();
