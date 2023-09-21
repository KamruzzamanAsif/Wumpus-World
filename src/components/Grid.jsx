import { useState } from "react";
import "../styles/Grid.css";
import { boards } from "./Boards";
import Cell from "./Cell";
import { move } from "./Play";

const Grid = () => {
  // cheat mode
  const [cheatMode, setCheatMode] = useState(true);
  function toggleCheatMode() {
    setCheatMode(!cheatMode);
  }

  // move
  const moveAgent = () => {
    console.log("start");
    move();
  };

  // ONLY FOR VIEW PURPOSE, DONT TOUCH IT ------
  const grid = [];
  const board = boards.getBoard();
  for (let r = 0; r < 9; r++) {
    const row = [];
    for (let c = 0; c < 9; c++) {
      // const cellID = r * 10 + c;
      row.push(board[c][r]);
    }
    grid.push(row);
  }
  // ONLY FOR VIEW PURPOSE, DONT TOUCH IT ------

  // view
  return (
    <div className="game-container">
      <div
        className="left-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <button className="playBtn cheatBtn" onClick={moveAgent}>
            Start
          </button>
        </div>
        <div className="cheatSection">
          <button className="cheatBtn" onClick={toggleCheatMode}>
            {cheatMode ? "Cheat Mode ON" : "Cheat Mode OFF"}
          </button>
        </div>
      </div>

      <div className="game-board">
        {grid.map((col, colIndex) => (
          <div key={colIndex} className="row">
            {col.map((cell, rowIndex) => (
              <div key={rowIndex} className="box">
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
