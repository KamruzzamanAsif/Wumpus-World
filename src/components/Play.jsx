// export async function playGame({ setMessage }) {
//   let count = 1;
//   let flag = true;

import { boards } from "./Boards";

//   while (flag) {
//     const randomNumber = Math.floor(Math.random() * 100) + 1;
//     setMessage(`Guessing ${randomNumber}`);

//     if (randomNumber === 5) {
//       setMessage("You guessed 5! Game over.");
//       break; // End the game if the condition is met
//     } else if (count >= 100) {
//       setMessage("Reached 100 guesses. Game over.");
//       break; // End the game if the condition is met
//     }

//     // Introduce a delay of 100 milliseconds before the next iteration
//     await new Promise((resolve) => setTimeout(resolve, 10));

//     count++;
//   }
// }

export function move() {
  // let board = boards.getBoard();
  // console.log(board[8][0]);
  // board[8][0] = "P";
  // console.log(board[8][0]);
  console.log(boards.getBoard());
  // let current_x, current_y, new_x, new_y;

  // let flag = true;
  // while (flag) {
  //   if (current_x >= 0 && current_x < 10 && current_y >= 0 && current_y < 10) {
  //     // up
  //     new_x = new_x - 1;
  //     // down
  //     new_x = new_x + 1;
  //     // left
  //     new_y  = new_y - 1
  //     // right
  //     new_y  = new_y + 1
  //   }
  // }

  // await new Promise((resolve) => setTimeout(resolve, 10));
}
