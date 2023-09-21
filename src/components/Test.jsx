import React, { useState } from "react";
import { playGame } from "./Play";

const NumberGuessGame = () => {
  const [message, setMessage] = useState("");

  const startGame = () => {
    setMessage("Game started:");
    playGame({ setMessage });
  };

  return (
    <div>
      <h1>Number Guess Game</h1>
      <button onClick={startGame}>Start</button>
      <p>{message}</p>
    </div>
  );
};

export default NumberGuessGame;
