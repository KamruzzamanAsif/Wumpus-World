import { useEffect, useState } from "react";
import "../styles/Grid.css";
import { boards } from "./Boards";
import Cell from "./Cell";
import CheatCell from "./CheatCell";
import { play } from "./Play";

/**
 * NEED TO FIX:
 * 2. LOOP ERROR in PIT LOOP (NEGATIVE INDEX)
 * 3. REMOVE THE LAST GOLD AFTER FOUND
 * 4. STECH ERROR
 * 5. LOAD IMAGE (WB, )
 */

const Grid = () => {
  const [cheatMode, setCheatMode] = useState(true);
  const [board, setBoard] = useState(boards.initialGrid);
  const [playmode, setPlayMode] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");

  let isMoving = 0;

  function toggleCheatMode() {
    setCheatMode(!cheatMode);
  }

  // function resetBoard() {
  //   console.log("inside reset", play.isGameOver(), play.agentIndex);
  //   play.gameOver = false;
  //   play.agentIndex.row = 0;
  //   play.agentIndex.column = 0;
  //   play.resetCellVisitedArray();
  //   console.log("inside reset", play.isGameOver(), play.cellVisited);

  //   // agent index issue
  //   setBoard(boards.initialGrid);
  //   setPlayMode(false);
  //   console.log(boards.initialGrid);
  // }

  const moveAgent = async () => {
    setPlayMode(true);

    // TOOD: RESET BUTTON

    //! this is must to recursively run the agent after a specific interval
    async function makeNextMove() {
      if (isMoving > 0) {
        // ****** NEW GAME ********
        play.makeMove();
        boards.updateBoard(play.agentIndex);
        boards.setBoard(play.getBoard());
        if (play.isShoot) {
          setFinalMessage("Wumpus Shooted at ");
        }
        console.log("PTN: ", play.point);
        console.log("PROB of PIT: ", play.pitProbability);
        console.log("PROB of Wumpus: ", play.wumpusProbability);
        console.log("BOARD: ", boards.getBoard());
        console.log("CHEAT: ", play.cboard);
        // ****** New MOVE ********

        setBoard([...boards.getBoard()]);
        isMoving = isMoving - 1;

        // Wait for a short period before making the next move
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (play.isGameOver()) {
          if (play.isYouWin()) {
            // console.log("Wuhhu! You Collected all Golds");
            setFinalMessage("Wuhhu! You Collected all Golds");
            // play.board[play.agentIndex.row][play.agentIndex.col] = "S";
            setBoard([...boards.getBoard()]);
            isMoving = 0;
          } else if (play.isYouLose()) {
            // console.log(
            //   "Nooo! You Lost! (" +
            //     ")You fall into Pit => " +
            //     play.agentIndex.row +
            //     ", " +
            //     play.agentIndex.column
            // );
            setFinalMessage(
              "Nooo! You Lost! You fall into Pit => " +
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

    isMoving = 1225;
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

  const pitProb = [];
  const wumpusProb = [];
  for (let r = 0; r < 10; r++) {
    const row = [];
    const row2 = [];
    for (let c = 0; c < 10; c++) {
      row.push(play.pitProbability[c][r]);
      row2.push(play.wumpusProbability[c][r]);
    }
    pitProb.push(row);
    wumpusProb.push(row2);
  }

  // view
  return (
    <div className="game-container">
      <div
        className="left-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="left-upper-container">
          <div className="cheat-board">
            {wumpusProb.map((col, colIndex) => (
              <div key={colIndex} className="row">
                {col.map((cell, rowIndex) => (
                  <div key={rowIndex} className="cheat-box">
                    <CheatCell id={cell} x={rowIndex} y={colIndex} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="left-bottom-container">
          <div className="text-area">
            <h2 style={{ color: "green" }}>Points: {play.point}</h2>
            <h2 className="text-box" style={{ color: "red" }}>
              Wumpus Killed: {play.wumpusKilled}
            </h2>
            <h2 className="text-box" style={{ color: "brown" }}>
              Pit: {play.pitCount}
            </h2>
            <h2 className="text-box" style={{ color: "goldenrod" }}>
              Gold Collected: {play.discoveredGold}
            </h2>
            <h2 className="text-box" style={{ color: "blue" }}>
              Moves: {play.moveCount}
            </h2>
          </div>
        </div>
        <div>
          {/* <button className="cheatBtn" onClick={resetBoard}>
            Reset
          </button> */}
        </div>
        <div className="playBtnSection">
          {!playmode ? (
            <button className="cheatBtn" onClick={moveAgent}>
              Play
            </button>
          ) : (
            <button disabled className="cheatBtn" onClick={moveAgent}>
              Play
            </button>
          )}
          <button className="cheatBtn" onClick={toggleCheatMode}>
            {cheatMode ? "Cheat Mode ON" : "Cheat Mode OFF"}
          </button>
          <h2 className="text-box" style={{ color: "blueviolet" }}>
            {finalMessage}
          </h2>
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

      <div className="right-container">
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
    </div>
  );
};

export default Grid;
