// src/components/Grid.js
import "../styles/Grid.css"; // Import your CSS file
import Cell from "./Cell";

const Grid = () => {
  const GRID_SIZE = 10; // Set the size of the grid to 10x10

  const input = [
    ["S", "S", "S", "S", "S", "S", "S", "S", "P", "S"],
    ["S", "S", "W", "S", "S", "S", "W", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "G", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "P", "S", "S", "S"],
    ["S", "P", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "W", "S", "S"],
    ["S", "S", "S", "P", "S", "S", "S", "S", "S", "P"],
    ["P", "S", "S", "S", "P", "S", "S", "S", "S", "S"],
    ["A", "S", "S", "S", "S", "W", "S", "S", "S", "S"],
  ];

  const grid = [];

  for (let r = 0; r < GRID_SIZE; r++) {
    const row = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      // const cellID = c * GRID_SIZE + r;
      row.push(input[c][r]);
    }
    grid.push(row);
  }

  return (
    <div className="game-container">
      {/* Left side content */}
      
      <div className="left-content">
        {/* Add your scores, controls, and other text here */}
      </div>

      {/* Right side game board */}
      <div className="game-board">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, cellid) => (
              <div key={cellid} className="box">
                <Cell id={cell} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
