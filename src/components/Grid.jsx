// src/components/Grid.js
import { useState } from "react";
import "../styles/Grid.css"; // Import your CSS file
import Cell from "./Cell";

const Grid = () => {
  const GRID_SIZE = 10;

  const [cheatMode, setCheatMode] = useState(true);

  function toogleCheatMode() {
    setCheatMode(!cheatMode);
  }

  // input matrix
  const input = [
    ["S", "S", "S", "S", "S", "S", "S", "S", "P", "S"],
    ["S", "S", "W", "S", "S", "S", "W", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "G", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "P", "S", "S", "S"],
    ["S", "P", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "W", "S", "S", "S", "S"],
    ["S", "S", "S", "P", "S", "S", "S", "S", "S", "P"],
    ["P", "S", "S", "S", "P", "S", "S", "S", "S", "S"],
    ["A", "S", "S", "S", "S", "W", "S", "S", "S", "S"],
  ];

  // populate grid matrix
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
      <div className="left-content">
        <p style={{ marginRight: "5px", marginTop: "1rem" }}>Cheat Mode: </p>
        {/* TODO: Button style */}
        <button className="cheatBtn" onClick={toogleCheatMode}>
          {cheatMode ? "Disable" : "Enable"}
        </button>
      </div>

      <div className="game-board">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, cellid) => (
              <div key={cellid} className="box">
                <Cell id={cell} cheatMode={cheatMode} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
