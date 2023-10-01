/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "../styles/AgentMode.scss";
import "../styles/Button.css";
import "../styles/Grid.css";
import "../styles/Slider.css";
import Cell from "./Cell";
import CheatCell from "./CheatCell";
import { play } from "./Play";

import useSound from "use-sound";
import goldCollectSound from "../assets/audio/coin_punch.wav";
import shootSound from "../assets/audio/scream.mp3";
import loseSound from "../assets/loseSound.mp3";
import playSound from "../assets/playSound.mp3";
import winSound from "../assets/winSound.mp3";

/**
 * NEED TO FIX:
 */

const Grid = () => {
  const [cheatMode, setCheatMode] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [board, setBoard] = useState(play.getBoard());
  const [finalMessage, setFinalMessage] = useState("");
  const [wumpusCnt, setWumpusCnt] = useState(3);
  const [pitCnt, setPitCnt] = useState(5);
  const [goldCnt, setGoldCnt] = useState(2);
  const [isDareDevilMode, setDareDevilMode] = useState(false);
  const [playBtnSound] = useSound(playSound);
  const [coinCollectSound] = useSound(goldCollectSound);
  const [winningSound] = useSound(winSound);
  const [losingSound] = useSound(loseSound);
  const [shootingSound] = useSound(shootSound);
  const [hoveredCell, setHoveredCell] = useState({ x: null, y: null });
  let latestWumpus = wumpusCnt;
  let latestPit = pitCnt;
  let latestGold = goldCnt;
  let difficultyMode = "";

  let isMoving = 0;

  function toggleCheatMode() {
    playBtnSound();
    setCheatMode(!cheatMode);
  }
  // reset board should be updated

  function resetBoard() {
    playBtnSound();
    play.resetGameEnvironment();
    play.gameOnInit(latestWumpus, latestPit, latestGold, difficultyMode); // Update game parameters
    setFinalMessage("");
    setBoard([...play.getBoard()]); // Update the board
  }

  function handleWumpusCnt(event) {
    const newValue = event.target.value;
    latestWumpus = newValue;
    setWumpusCnt(newValue);
    resetBoard();
  }

  function handlePitCnt(event) {
    const newValue = event.target.value;
    latestPit = newValue;
    setPitCnt(newValue);
    resetBoard();
  }

  function handleGoldCnt(event) {
    const newValue = event.target.value;
    latestGold = newValue;
    setGoldCnt(newValue);
    resetBoard();
  }

  function handleDareDevilMode() {
    playBtnSound();
    setDareDevilMode(!isDareDevilMode);
    if (isDareDevilMode == false) {
      difficultyMode = "Easy";
      console.log(difficultyMode);
    } else {
      console.log(difficultyMode);
    }

    play.setDifficultyMode(difficultyMode);
  }

  const handleHover = (x, y, isHovered) => {
    setHoveredCell({ x, y, isHovered });
  };

  const uploadBoard = (e) => {
    resetBoard();
    const file = e.target.files[0];

    // Create a new FileReader
    const reader = new FileReader();

    // Initialize variables to keep track of the read progress
    let currentPosition = 0;
    const chunkSize = 1024; // You can adjust this value to control the chunk size

    // Initialize newBoard as an empty array
    const newBoard = [];

    reader.onload = (event) => {
      const data = event.target.result;
      const lines = data.split("\n"); // Split the data into lines

      // Process each line
      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];
        const row = [];

        for (let j = 0; j < line.length - 1; j++) {
          if (line[j] === "-") row.push("S");
          else row.push(line[j]);
        }

        newBoard.push(row);
      }

      // If there are more lines to process, continue reading
      if (currentPosition < file.size) {
        readNextChunk();
      } else {
        //? File reading is complete, you can now use newBoard
        console.log("FILE: ", newBoard);
        play.resetGameEnvironment();
        play.setBoard(newBoard);

        setWumpusCnt(play.wumpusCount);
        setPitCnt(play.pitCount);
        setGoldCnt(play.goldCount);
        setBoard([...play.getBoard()]);
        // TODO: Update board with given one
      }
    };

    // Function to read the next chunk of data
    const readNextChunk = () => {
      const blob = file.slice(currentPosition, currentPosition + chunkSize);
      reader.readAsText(blob);
      currentPosition += chunkSize;
    };

    // Start reading the first chunk of data
    readNextChunk();
  };

  const moveAgent = async () => {
    playBtnSound();

    //! this is must to recursively run the agent after a specific interval
    async function makeNextMove() {
      if (isMoving > 0 && !play.isGameOver()) {
        // setShotFired(false);
        // ****** NEW GAME ********
        // moveSound();

        play.makeMove();
        if (play.isShoot) {
          setFinalMessage("Wumpus Shooted");
        }

        // ****** New MOVE ********

        setBoard([...play.getBoard()]);
        isMoving = isMoving - 1;
        if (play.isGoldFound) {
          setFinalMessage(play.discoveredGold + " Gold Discovered");
        }

        // Wait for a short period before making the next move
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (play.isGameOver()) {
          if (play.isYouWin()) {
            winningSound();
            setFinalMessage("🎉🎉 Wuhhu! You Collected all Golds 🎉🎉");
            setBoard([...play.getBoard()]);
            isMoving = 0;
          } else if (play.isYouLose()) {
            losingSound();
            setFinalMessage(
              "🏳🏳 Nooo! You Lost! You fall into Pit => " +
                play.agentIndex.row +
                ", " +
                play.agentIndex.column +
                "🏳🏳"
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

  //! Configured the Board for View [Dont' Dare to touch it]
  const grid = [];
  for (let r = 0; r < 10; r++) {
    const row = [];
    for (let c = 0; c < 10; c++) {
      row.push(play.getBoard()[c][r]);
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

  useEffect(() => {
    // Play shootingSound when play.isShoot is true
    console.log("A: ", play.isShoot);
    if (play.isShoot) {
      shootingSound();
      play.isShoot = false;
    }
  }, [play.isShoot, shootingSound]);

  useEffect(() => {
    console.log("COINT: ", play.isGoldFound);
    if (play.isGoldFound) {
      coinCollectSound();
      play.isGoldFound = false;
    }
  }, [play.isGoldFound, coinCollectSound]);

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
          <div className="grid-heading">
            <div className="wumpus-board-heading">Wumpus Probability</div>
            <div className="pit-board-heading">Pit Probability</div>
          </div>
          <div className="cheat-board">
            <div className="wumpus-board">
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
            <div className="pit-board">
              {pitProb.map((col, colIndex) => (
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
        </div>
        <div className="left-bottom-container">
          <div className="gameState">
            <div className="inputSection">
              <div className="valueCover">
                <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Wumpus Count 😈
                </h2>
                <div className="value">{wumpusCnt}</div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={wumpusCnt}
                  onChange={handleWumpusCnt}
                />
              </div>
              <div className="valueCover">
                <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Pit Count 🕳️
                </h2>
                <div className="value">{pitCnt}</div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={pitCnt}
                  onChange={handlePitCnt}
                />
              </div>
              <div className="valueCover">
                <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Gold Count 🧈
                </h2>
                <div className="value">{goldCnt}</div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={goldCnt}
                  onChange={handleGoldCnt}
                />
              </div>
              <div className="valueCover">
                <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Daredevil Mode 🥷
                </h2>
                <div className="toggle">
                  <input
                    className="toggle-input"
                    type="checkbox"
                    checked={isDareDevilMode}
                    onChange={handleDareDevilMode}
                  />
                  <div className="toggle-handle-wrapper">
                    <div className="toggle-handle">
                      <div className="toggle-handle-knob"></div>
                      <div className="toggle-handle-bar-wrapper">
                        <div className="toggle-handle-bar"></div>
                      </div>
                    </div>
                  </div>
                  <div className="toggle-base">
                    <div className="toggle-base-inside"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="playBtnSection">
              <button className="custom-btn" onClick={moveAgent}>
                Play
              </button>
              <button className="custom-btn" onClick={toggleCheatMode}>
                {cheatMode ? "Cheat Mode ON" : "Cheat Mode OFF"}
              </button>

              <button className="custom-btn" onClick={resetBoard}>
                Reset
              </button>

              <div className="upload-group" style={{ marginTop: "1.2rem" }}>
                <label htmlFor="customBoard">Upload Board </label>
                <input
                  className="form-field"
                  type="file"
                  name="customBoard"
                  onChange={(e) => uploadBoard(e)}
                />
              </div>
            </div>
          </div>
          <div className="text-area">
            <h2 className="text-box" style={{ color: "green" }}>
              🏅 Points: {play.point}
            </h2>
            <h2 className="text-box" style={{ color: "red" }}>
              🗡 Wumpus Killed: {play.wumpusKilled}
            </h2>
            {/* <h2 className="text-box" style={{ color: "brown" }}>
              🕳 Pit: {play.pitCount}
            </h2> */}
            <h2 className="text-box" style={{ color: "orange" }}>
              🪙 Gold Collected: {play.discoveredGold}
            </h2>
            <h2 className="text-box" style={{ color: "blue" }}>
              🏃 Moves: {play.moveCount}
            </h2>
          </div>
        </div>
        <div className="message-box">
          <h2 className="alert-box" style={{ color: "black" }}>
            {finalMessage}
          </h2>
        </div>
      </div>

      <div className="right-container">
        <div className="title">Wumpus World</div>
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
