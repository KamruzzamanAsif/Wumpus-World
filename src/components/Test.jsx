import React, { useState } from "react";
// import { playGame } from "./Play";

export async function playGame({ setMessage }) {
  let count = 1;
  let flag = true;


  while (flag) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setMessage(`Guessing ${randomNumber}`);

    if (randomNumber === 5) {
      setMessage("You guessed 5! Game over.");
      break; // End the game if the condition is met
    } else if (count >= 100) {
      setMessage("Reached 100 guesses. Game over.");
      break; // End the game if the condition is met
    }

    // Introduce a delay of 100 milliseconds before the next iteration
    await new Promise((resolve) => setTimeout(resolve, 10));

    count++;
  }
}

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
