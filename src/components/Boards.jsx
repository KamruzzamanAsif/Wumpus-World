// src/components/Boards.js

export class Boards {
  constructor() {
    this.GRID_SIZE = 10;

    this.grid = [
      ["S", "S", "S", "S", "S", "S", "S", "S", "P", "S"],
      ["S", "S", "W", "S", "S", "S", "W", "S", "S", "S"],
      ["S", "S", "S", "S", "G", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "P", "S", "S", "S"],
      ["S", "P", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "W", "S", "S", "S", "S"],
      ["S", "G", "S", "P", "S", "S", "S", "S", "S", "P"],
      ["A", "S", "S", "S", "P", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "W", "S", "S", "S", "S"],
    ];
  }

  getBoard() {
    // let board = [];

    // for (let r = 0; r < this.GRID_SIZE - 1; r++) {
    //   const row = [];
    //   for (let c = 0; c < this.GRID_SIZE - 1; c++) {
    //     // const id = c * this.GRID_SIZE + r;
    //     row.push(this.grid[r][c]);
    //   }
    //   board.push(row);
    // }

    return this.grid;
  }

  getCurrentPosition(element) {
    let rowIndex = -1;
    let colIndex = -1;

    for (let i = 0; i < this.GRID_SIZE; i++) {
      const row = this.grid[i];
      if (row.includes(element)) {
        rowIndex = i;
        colIndex = row.indexOf("A");
        break; // Found 'A', so break out of the loop
      }
    }

    return { rowIndex, colIndex };
  }
}

export const boards = new Boards();
