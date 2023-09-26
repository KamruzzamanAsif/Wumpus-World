import { useEffect, useState } from "react";
import "../styles/Grid.css";
import { boards } from "./Boards";
import Cell from "./Cell";
import { play } from "./Play";

const Grid = () => {
  const [cheatMode, setCheatMode] = useState(true);
  const [board, setBoard] = useState(boards.getBoard());
  const [playmode, setPlayMode] = useState(false);
  let isMoving = 0;

  function toggleCheatMode() {
    setCheatMode(!cheatMode);
  }

  function resetBoard() {
    console.log("inside reset", play.isGameOver(), play.agentIndex);
    play.gameOver = false;
    play.agentIndex.row = 0;
    play.agentIndex.column = 0;
    play.resetCellVisitedArray();
    console.log("inside reset", play.isGameOver(), play.cellVisited);

    // agent index issue
    setBoard(boards.initialGrid);
    setPlayMode(false);
    console.log(boards.initialGrid);
  }

  const moveAgent = async () => {
    setPlayMode(true);

    // TOOD: RESET BUTTON

    //! this is must to recursively run the agent after a specific interval
    async function makeNextMove() {
      if (isMoving > 0 && !play.isGameOver()) {
        // ****** NEW GAME ********
        if (play.board[0][0] == "A") {
          play.board[0][0] = "S";
        }
        play.makeMove();
        boards.updateBoard(play.agentIndex);
        console.log("PTN: ", play.point);
        // ****** New MOVE ********

        setBoard([...boards.getBoard()]);
        isMoving = isMoving - 1;

        // Wait for a short period before making the next move
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (play.isGameOver()) {
          if (play.isYouWin()) {
            alert("Wuhhu! You Collected all Golds");
          } else if (play.isYouLose()) {
            alert(
              "Nooo! You Lost! " +
                "You fall into Pit => " +
                play.agentIndex.row +
                ", " +
                play.agentIndex.column
            );
          }
        } else {
          // Make the next move
          makeNextMove();
        }
      }
    }

    isMoving = 1500;
    makeNextMove();
  };

  // re-render the UI when agent make move
  useEffect(() => {
    console.log("LAST");
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
          {/* <button
            className="cheatBtn"
            onClick={() => {
              boards.setRandomBoard();
              setBoard([...boards.getBoard()]);
            }}
          >
            Generate Board
          </button> */}
        </div>
      </div>

      <div className="game-board">
        {grid.map((col, colIndex) => (
          <div key={colIndex} className="row">
            {col.map((cell, rowIndex) => (
              <div key={rowIndex} className="box">
                <Cell
                  id={cell}
                  cheatMode={cheatMode}
                  x={rowIndex}
                  y={colIndex}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
