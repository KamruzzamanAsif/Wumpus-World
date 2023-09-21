// Game.js

import { initial_board } from "./Boards";

document.addEventListener("keydown", function (event) {
  // Get the current position of 'A'
  const currentPosition = initial_board.indexOf("A");

  // Check which arrow key was pressed
  switch (event.keyCode) {
    case 38: // Up arrow key
      // If 'A' is not in the top row, move it up
      if (currentPosition >= 10) {
        initial_board[currentPosition] = "S";
        initial_board[currentPosition - 10] = "A";
        console.log("UP");
      }
      break;
    case 40: // Down arrow key
      // If 'A' is not in the bottom row, move it down
      if (currentPosition < 90) {
        initial_board[currentPosition] = "S";
        initial_board[currentPosition + 10] = "A";
        console.log("DOWN");
      }
      break;
    case 37: // Left arrow key
      // If 'A' is not in the leftmost column, move it left
      if (currentPosition % 10 !== 0) {
        initial_board[currentPosition] = "S";
        initial_board[currentPosition - 1] = "A";
        console.log("LEFT");
      }
      break;
    case 39: // Right arrow key
      // If 'A' is not in the rightmost column, move it right
      if ((currentPosition + 1) % 10 !== 0) {
        initial_board[currentPosition] = "S";
        initial_board[currentPosition + 1] = "A";
        console.log("RIGHT");
      }
      break;
  }

  // Prevent the default behavior of the arrow keys
  event.preventDefault();
});


export default initial_board;
