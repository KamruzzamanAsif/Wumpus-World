/* *** Notations ***

  S - (S)afe Cell
  W - (W)umpus
  A - (A)gent
  G - (G)old
  P - (P)it
  T - S(t)ench
  B - (B)reeze
  U - Both (Stech U Breeze) [ignore for now]

 */

export class Boards {
  constructor() {
    this.BOARD_SIZE = 10;
    this.modifiedCells = new Set();

    this.initialGrid = [
      ["S", "S", "T", "S", "S", "S", "T", "B", "P", "B"],
      ["S", "T", "W", "T", "S", "T", "W", "T", "B", "S"],
      ["S", "S", "T", "S", "G", "S", "T", "S", "S", "S"],
      ["S", "B", "S", "S", "S", "B", "P", "B", "S", "S"],
      ["B", "P", "B", "S", "S", "B", "B", "S", "S", "S"],
      ["S", "B", "S", "S", "B", "P", "B", "S", "S", "S"],
      ["S", "S", "S", "B", "T", "W", "T", "S", "S", "B"],
      ["S", "S", "B", "P", "B", "T", "S", "S", "B", "P"],
      ["S", "S", "S", "B", "P", "B", "S", "S", "G", "B"],
      ["A", "S", "S", "S", "B", "W", "T", "S", "S", "S"],
    ];

    this.grid = this.deepCopy(this.initialGrid);
  }

  deepCopy(grid) {
    return grid.map((row) => [...row]);
  }

  addPercept(board) {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (let i = 0; i < this.BOARD_SIZE; i++) {
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        const currentCell = board[i][j];

        if (currentCell === "W" || currentCell === "P") {
          directions.forEach(([dx, dy]) => {
            const ni = i + dx;
            const nj = j + dy;
            if (this.isValidAndSafe(ni, nj)) {
              board[ni][nj] = currentCell === "W" ? "T" : "B";
            }
          });
        }
      }
    }

    return board;
  }

  generateRandomBoard() {
    // const characters = ["S", "W", "P", "G", "A"];
    let grid = [];

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
          } else if (pitCount < 5 && Math.random() < 0.2) {
            randomChar = "P"; // Up to 10 pits
            pitCount++;
          }
        }

        row.push(randomChar);
      }
      grid.push(row);
    }

    // console.log("GRID: ", this.grid);
    this.grid = this.deepCopy(grid);
    this.initialGrid = this.deepCopy(grid);
    // console.log("New ", grid);

    grid = this.addPercept(grid);
    return grid;
  }

  getBoard() {
    return this.grid;
  }

  setRandomBoard() {
    const newRandomBoard = this.generateRandomBoard();
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
  // findSafeCells(current_x, current_y) {
  //   const safeCells = [];

  // Check the four adjacent cells for safety
  //   //! CHEATING...
  //   //? We need to sort out possible Pit or Wumpus without acc
  //   const directions = [
  //     [current_x + 1, current_y],
  //     [current_x - 1, current_y],
  //     [current_x, current_y + 1],
  //     [current_x, current_y - 1],
  //   ];

  //   for (const [new_x, new_y] of directions) {
  //     if (this.isValidAndSafe(new_x, new_y)) {
  //       safeCells.push({ new_x, new_y });
  //     }
  //   }

  //   return safeCells;
  // }

  findSafeCells(current_x, current_y) {
    const safeCells = [];
    const board = this.getBoard();
    // console.log("Latest board: ", board);
    const BOARD_SIZE = this.BOARD_SIZE;

    // Create a 2D array to represent the probabilities of hazards in each cell
    const hazardProbabilities = Array.from({ length: BOARD_SIZE }, () =>
      Array(BOARD_SIZE).fill(0)
    );

    // Update hazard probabilities based on sensory information
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        if (!this.isValidAndSafe(x, y)) {
          // Skip cells that are not safe
          continue;
        }

        if (board[x][y] === "T") {
          // Update probability of a wumpus based on stench
          hazardProbabilities[x][y] += 0.3; // Adjust this value based on game balance
        }

        if (board[x][y] === "B") {
          // Update probability of a pit based on breeze
          hazardProbabilities[x][y] += 0.3; // Adjust this value based on game balance
        }
      }
    }

    // Check for stench and breeze in the current cell
    const hasStench = this.initialGrid[current_x][current_y] === "T";
    const hasBreeze = this.initialGrid[current_x][current_y] === "B";

    // Rules for deducing wumpuses and pits
    if (hasStench) {
      // If there's a stench in the current cell, it's a potential wumpus location
      // Consider adjacent cells with lower wumpus probability as safe
      const directions = [
        [current_x + 1, current_y],
        [current_x - 1, current_y],
        [current_x, current_y + 1],
        [current_x, current_y - 1],
      ];

      for (const [new_x, new_y] of directions) {
        if (
          this.isValidAndSafe(new_x, new_y) &&
          hazardProbabilities[new_x][new_y] < 0.5
        ) {
          // If the wumpus probability is low, the cell is safe
          safeCells.push({ new_x, new_y });
        }
      }
    }

    if (hasBreeze) {
      // If there's a breeze in the current cell, it's a potential pit location
      // Consider adjacent cells with lower pit probability as safe
      const directions = [
        [current_x + 1, current_y],
        [current_x - 1, current_y],
        [current_x, current_y + 1],
        [current_x, current_y - 1],
      ];

      for (const [new_x, new_y] of directions) {
        if (
          this.isValidAndSafe(new_x, new_y) &&
          hazardProbabilities[new_x][new_y] < 0.5
        ) {
          // If the pit probability is low, the cell is safe
          safeCells.push({ new_x, new_y });
        }
      }
    }

    return safeCells;
  }

  makeMove(target_x, target_y, current_x, current_y) {
    const gameBoard = this.getBoard();

    if (this.isValidAndSafe(target_x, target_y)) {
      const targetCell = `${target_x}-${target_y}`;
      this.modifiedCells.add(targetCell);

      gameBoard[target_x][target_y] = "A";
      gameBoard[current_x][current_y] = this.getCellState(current_x, current_y);
      return true;
    } else {
      // TODO: here we have to make descision if it's wumpus or pit or Bump [bump means invalid move](Abir)
      gameBoard[target_x][target_y] = "A";
      gameBoard[current_x][current_y] = this.initialGrid[current_x][current_y];
      console.error("Invalid or unsafe move.");
      return false;
    }
  }

  getCellState(x, y) {
    const cellKey = `${x}-${y}`;
    if (this.modifiedCells.has(cellKey) && this.initialGrid[x][y] != "A") {
      return this.initialGrid[x][y];
    } else {
      return "S";
    }
  }
}

export const boards = new Boards();
