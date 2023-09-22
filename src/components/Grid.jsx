import { useEffect, useState } from "react";
import "../styles/Grid.css";
import { boards } from "./Boards";
import Cell from "./Cell";
import { move } from "./ControlLogic";

const Grid = () => {
  const [cheatMode, setCheatMode] = useState(true);
  const [board, setBoard] = useState(boards.getBoard());
  const [playmode, setPlayMode] = useState(false);

  function toggleCheatMode() {
    setCheatMode(!cheatMode);
  }

  function resetBoard() {
    setBoard([...boards.initialGrid]);
    boards.resetBoard();
    setPlayMode(false);
  }

  const moveAgent = async () => {
    setPlayMode(true);

    //! this is must to recursively run the agent after specific interval
    async function makeNextMove() {
      if (isMoving > 0) {
        
        //! move logics
        move();

        setBoard([...boards.getBoard()]);
        isMoving = isMoving - 1;

        // Wait for a short period before making the next move
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Make the next move
        makeNextMove();
      }
    }

    // TODO: Later it should be infinite until game is over
    let isMoving = 15;
    makeNextMove();
  };

  // re-render the UI when agent make move
  useEffect(() => {
    setBoard([...boards.getBoard()]);
  }, []);

  //! Configured the Board for View [Dont' Dare to touch it]
  const grid = [];
  for (let r = 0; r < 10; r++) {
    const row = [];
    for (let c = 0; c < 10; c++) {
      row.push(board[c][r]);
    }
    grid.push(row);
  }

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
          {!playmode ? (
            <button className="cheatBtn" onClick={moveAgent}>
              Play
            </button>
          ) : (
            <button disabled className="cheatBtn" onClick={moveAgent}>
              Play
            </button>
          )}

          <button className="cheatBtn" onClick={resetBoard}>
            Reset
          </button>
        </div>
        <div className="cheatSection">
          <button className="cheatBtn" onClick={toggleCheatMode}>
            {cheatMode ? "Cheat Mode ON" : "Cheat Mode OFF"}
          </button>
          <button
            className="cheatBtn"
            onClick={() => {
              boards.setRandomBoard();
              setBoard([...boards.getBoard()]);
            }}
          >
            Generate Board
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
