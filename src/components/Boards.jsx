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

import { play } from "./Play";

export class Boards {
  constructor() {
    this.BOARD_SIZE = 10;
    this.modifiedCells = new Set();
    this.initialGrid;
    this.difficultyMode = "Easy";

    this.initEnvironment();
    // this.grid = this.deepCopy(this.initialGrid);
  }

  initEnvironment() {
    play.gameOnInit(1, 5, 1, this.difficultyMode);

    // this.cellVisited = Array.from({ length: this.BOARD_SIZE }, () =>
    //   Array(this.BOARD_SIZE).fill(0)
    // );

    // play.cellVisited[0][0] = false;
    // play.cellVisited[9][0] = true;
    // this.initialGrid = this.deepCopy(play.board);
    // this.initialGrid[9][0] = "A";
    // return play.getBoard();
  }

  deepCopy(originalArray) {
    let new_arr = JSON.parse(JSON.stringify(originalArray));
    return new_arr;
  }

  getBoard() {
    // **** NEW BOARD ****
    // play.getBoard()
    return this.grid;
  }

  resetBoard() {
    // without deep copy, we can't reset the board state
    let board = this.initEnvironment();
    return board;
    // this.initEnvironment();
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

  // TODO: Find safe cell based on Inferential logic and Probabilistic Logic

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
        if (!this.isValidCell(x, y)) {
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
          this.isValidCell(new_x, new_y) &&
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
          this.isValidCell(new_x, new_y) &&
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

    if (this.isValidCell(target_x, target_y)) {
      const targetCell = `${target_x}-${target_y}`;
      this.modifiedCells.add(targetCell);

      gameBoard[target_x][target_y] = "A";
      gameBoard[current_x][current_y] = this.getCellState(current_x, current_y);

      // mark the cellvisited array as true
      this.cellVisited[current_x][current_y] = true;

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

  updateBoard(next_step) {
    let next_x = next_step.row;
    let next_y = next_step.column;

    let cur_x = play.currentIndex.row;
    let cur_y = play.currentIndex.column;

    // clear current cell agent

    if (this.grid[cur_x][cur_y] == "A" && cur_x == 9 && cur_y == 0) {
      this.initialGrid[cur_x][cur_y] = "S";
    }

    this.grid[next_x][next_y] = "A";
    this.grid[cur_x][cur_y] = this.initialGrid[cur_x][cur_y];
    this.cellVisited = play.cellVisited;
    console.log(cur_x, cur_y, next_x, next_y);
  }

  setBoard(new_board) {
    this.initialGrid = new_board;
  }

  clearEnvironment() {
    this.initialGrid = this.grid = Array.from(
      { length: this.BOARD_SIZE },
      () => {
        Array(this.BOARD_SIZE).fill("");
      }
    );
  }
}

export const boards = new Boards();
