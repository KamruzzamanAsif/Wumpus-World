export class Play {
  constructor() {
    this.gameOnInit(3, 5, 2, "Easy");
  }

  gridSize = 10;

  // count things
  wumpusCount = 0;
  pitCount = 0;
  goldCount = 0;
  point = 0;
  moveCount = 0;

  // directions
  UP = 0;
  DOWN = 1;
  LEFT = 2;
  RIGHT = 3;
  shootDirection!: number;
  moveDirection!: number;
  isShoot = false;

  // results
  gameOver = false;
  youWin = false;
  youLose = false;
  gameOverLine = "";
  isGoldFound = false;

  // this is cheat mode
  cheatOn = false;

  /*
        Cell types:
        =============
        - safe
        - T
        - B
        - agentsafe
        - agentstinky
        - agentB
        - wumpus (blurred)
        - pit (blurred)
        - gold (blurred)
        - agentwumpus
        - agentpit
        - agentgold
          S - (S)afe Cell
          W - (W)umpus
          A - (A)gent
          G - (G)old
          P - (P)it
          T - S(t)ench
          B - (B)reeze
          U - Both (Stech U Breeze) [ignore for now]
*/

  initialBoard = [
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
  ];

  board = [
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
  ];

  cellVisited = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ];

  nearDanger = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ];

  // this is the cheat board
  cboard = [
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
  ];

  pitProbability = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  ];

  // here we renamed stenchProbability to wumpusProbability
  wumpusProbability = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  ];

  threshold = 0.5;
  contiguousRandomMoveCount = 0;
  discoveredGold = 0;
  wumpusKilled = 0;

  totalMoves = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // for tracking agent
  agentIndex = {
    row: 9,
    column: 0,
  };

  currentIndex = {
    row: 9,
    column: 0,
  };

  busy: boolean = false;

  difficulty = "";

  /// this below methods will be called from outside
  gameOnInit(wumpusCount: any, pitCount: any, goldCount: any, difficulty: any) {
    this.wumpusCount = wumpusCount;
    this.pitCount = pitCount;
    this.goldCount = goldCount;
    this.difficulty = difficulty;

    console.log("MODE: ", this.difficulty);

    if (this.difficulty == "Easy") {
      this.threshold = 0.25;
    }

    this.init();

    // mark the first cell as visited
    this.cellVisited[9][0] = true;
  }

  isValidCell = (x: number, y: number) => {
    // Check if the cell is within the bounds of the board
    if (x >= 0 && x < 10 && y >= 0 && y < 10) {
      return true;
    }
    return false;
  };

  isGameOver() {
    if (this.gameOver) {
      return true;
    }
    return false;
  }
  isYouWin() {
    if (this.youWin) {
      return true;
    }
    return false;
  }
  isYouLose() {
    if (this.youLose) {
      return true;
    }
    return false;
  }

  /// this method will be called from outside
  makeMove() {
    var mv: number = -1;
    mv = this.move();
    this.moveCount += 1;

    // Store the current location in currentIndex
    this.currentIndex = {
      row: this.agentIndex.row,
      column: this.agentIndex.column,
    };

    if (mv == this.UP) {
      this.agentIndex.row--;
      this.point--;
    } else if (mv == this.DOWN) {
      this.agentIndex.row++;
      this.point--;
    } else if (mv == this.LEFT) {
      this.agentIndex.column--;
      this.point--;
    } else if (mv == this.RIGHT) {
      this.agentIndex.column++;
      this.point--;
    }

    // Return both currentIndex and move
    return mv;
  }

  move() {
    this.calculateBreezeAndStench();

    if (this.gameOver || this.busy) {
      // case when game ends
      return -1;
    }

    // cell contains gold
    if (this.board[this.agentIndex.row][this.agentIndex.column].includes("G")) {
      this.busy = true;
      this.discoveredGold += 1;
      this.point += 1000;
      this.isGoldFound = !this.isGoldFound;

      // this will execute a bit later, so that we can see the gold being taken
      setTimeout(() => {
        this.board[this.agentIndex.row][this.agentIndex.column] = this.board[
          this.agentIndex.row
        ][this.agentIndex.column].replace("G", "S");

        this.busy = false;
        // console.error("gold: " + this.discoveredGold);
      }, 1000);

      // when collects all gold
      if (this.discoveredGold == this.goldCount) {
        // console.error("Discovered gold " + this.discoveredGold);
        // console.error("total gold " + this.goldCount);

        this.gameOver = true;
        this.gameOverLine = "Congrats! You Win";
        this.youWin = true;

        return -1;
      }
    }
    // cell contains wumpus or, pit
    else if (
      this.board[this.agentIndex.row][this.agentIndex.column].includes("W") ||
      this.board[this.agentIndex.row][this.agentIndex.column].includes("P")
    ) {
      this.point -= 10000;
      this.gameOver = true;
      this.youLose = true;
      this.gameOverLine = "Game Over! You Lose";
      console.log(this.gameOverLine);
      return -1;
    }
    // agent is close to wumpus
    else if (this.wumpusCount > this.wumpusKilled && this.isWumpusClose()) {
      // console.error("shoot");
      // console.log("UP BOARD: ", this.board);
      this.isShoot = !this.isShoot;
      this.wumpusKilled += 1;
      if (this.shootDirection == this.RIGHT) {
        this.board[this.agentIndex.row][this.agentIndex.column + 1] =
          this.board[this.agentIndex.row][this.agentIndex.column + 1].replace(
            "W",
            ""
          );

        if (this.board[this.agentIndex.row][this.agentIndex.column + 1] == "") {
          this.board[this.agentIndex.row][this.agentIndex.column + 1] = "D";
        }

        this.removeStench(this.agentIndex.row, this.agentIndex.column + 1);
      } else if (this.shootDirection == this.LEFT) {
        this.board[this.agentIndex.row][this.agentIndex.column - 1] =
          this.board[this.agentIndex.row][this.agentIndex.column - 1].replace(
            "W",
            ""
          );
        if (this.board[this.agentIndex.row][this.agentIndex.column - 1] == "") {
          this.board[this.agentIndex.row][this.agentIndex.column - 1] = "D";
        }
        this.removeStench(this.agentIndex.row, this.agentIndex.column - 1);
      } else if (this.shootDirection == this.UP) {
        this.board[this.agentIndex.row - 1][this.agentIndex.column] =
          this.board[this.agentIndex.row - 1][this.agentIndex.column].replace(
            "W",
            ""
          );
        if (this.board[this.agentIndex.row - 1][this.agentIndex.column] == "") {
          this.board[this.agentIndex.row - 1][this.agentIndex.column] = "D";
        }
        this.removeStench(this.agentIndex.row - 1, this.agentIndex.column);
      } else if (this.shootDirection == this.DOWN) {
        this.board[this.agentIndex.row + 1][this.agentIndex.column] =
          this.board[this.agentIndex.row + 1][this.agentIndex.column].replace(
            "W",
            ""
          );
        if (this.board[this.agentIndex.row + 1][this.agentIndex.column] == "") {
          this.board[this.agentIndex.row + 1][this.agentIndex.column] = "D";
        }
        this.removeStench(this.agentIndex.row + 1, this.agentIndex.column);
      }

      console.log("DEAD: ", this.board);

      return -1; // return -1 means nothing. it wasn't used
    }
    // we are in pit loop
    else if (this.areWeInPitLoop()) {
      console.log("pit loop");
      // first move to a random index where pit prob is less than threshold
      const lessThresholdRandomDirections: number[] = [];
      if (
        this.agentIndex.row < 9 &&
        this.pitProbability[this.agentIndex.row + 1][this.agentIndex.column] <
          this.threshold
      ) {
        lessThresholdRandomDirections.push(this.DOWN);
      }
      if (
        this.agentIndex.column < 9 &&
        this.pitProbability[this.agentIndex.row][this.agentIndex.column + 1] <
          this.threshold
      ) {
        lessThresholdRandomDirections.push(this.RIGHT);
      }
      if (
        this.agentIndex.row > 0 &&
        this.pitProbability[this.agentIndex.row - 1][this.agentIndex.column] <
          this.threshold
      ) {
        lessThresholdRandomDirections.push(this.UP);
      }
      if (
        this.agentIndex.column > 0 &&
        this.pitProbability[this.agentIndex.row][this.agentIndex.column - 1] <
          this.threshold
      ) {
        lessThresholdRandomDirections.push(this.LEFT);
      }

      if (lessThresholdRandomDirections.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * lessThresholdRandomDirections.length
        );
        const randomDirection = lessThresholdRandomDirections[randomIndex];
        // update the total moves and return the chosen direction
        switch (randomDirection) {
          case this.LEFT:
            this.contiguousRandomMoveCount = 0;
            return this.LEFT;
          case this.RIGHT:
            this.contiguousRandomMoveCount = 0;
            return this.RIGHT;
          case this.UP:
            this.contiguousRandomMoveCount = 0;
            return this.UP;
          case this.DOWN:
            this.contiguousRandomMoveCount = 0;
            return this.DOWN;
        }
      } else {
        // move to a random index
        /**** Lastly, move randomly ****/
        const randomDirections: number[] = [];
        if (this.agentIndex.row > 0) {
          randomDirections.push(this.UP);
        }
        if (this.agentIndex.column > 0) {
          randomDirections.push(this.LEFT);
        }
        if (this.agentIndex.row < 9) {
          randomDirections.push(this.DOWN);
        }
        if (this.agentIndex.column < 9) {
          randomDirections.push(this.RIGHT);
        }

        if (randomDirections.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * randomDirections.length
          );
          const randomDirection = randomDirections[randomIndex];
          // update the total moves and return the chosen direction
          switch (randomDirection) {
            case this.LEFT:
              this.contiguousRandomMoveCount = 0;
              return this.LEFT;
            case this.RIGHT:
              this.contiguousRandomMoveCount = 0;
              return this.RIGHT;
            case this.UP:
              this.contiguousRandomMoveCount = 0;
              return this.UP;
            case this.DOWN:
              this.contiguousRandomMoveCount = 0;
              return this.DOWN;
          }
        }
      }
    }
    // cell is danger cell
    else if (this.isItDangerCell()) {
      console.log("danger space");
      // ***** Firstly we will backtrack to already visited cells *****//
      // Create an array to store available directions
      const visitedAvailableDirections: number[] = [];

      // Check if up is safe and add it to available directions
      if (
        this.agentIndex.row > 0 &&
        this.cellVisited[this.agentIndex.row - 1][this.agentIndex.column]
      ) {
        if (
          this.totalMoves[this.agentIndex.row - 1][this.agentIndex.column] < 15
        )
          visitedAvailableDirections.push(this.UP);
      }

      // Check if left is safe and add it to available directions
      if (
        this.agentIndex.column > 0 &&
        this.cellVisited[this.agentIndex.row][this.agentIndex.column - 1]
      ) {
        if (
          this.totalMoves[this.agentIndex.row][this.agentIndex.column - 1] < 15
        )
          visitedAvailableDirections.push(this.LEFT);
      }

      // Check if down is safe and add it to available directions
      if (
        this.agentIndex.row < 9 &&
        this.cellVisited[this.agentIndex.row + 1][this.agentIndex.column]
      ) {
        if (
          this.totalMoves[this.agentIndex.row + 1][this.agentIndex.column] < 15
        )
          visitedAvailableDirections.push(this.DOWN);
      }

      // Check if right is safe and add it to available directions
      if (
        this.agentIndex.column < 9 &&
        this.cellVisited[this.agentIndex.row][this.agentIndex.column + 1]
      ) {
        if (
          this.totalMoves[this.agentIndex.row][this.agentIndex.column + 1] < 15
        )
          visitedAvailableDirections.push(this.RIGHT);
      }

      if (visitedAvailableDirections.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * visitedAvailableDirections.length
        );
        const randomDirection = visitedAvailableDirections[randomIndex];
        // update the total moves and return the chosen direction
        switch (randomDirection) {
          case this.LEFT:
            this.totalMoves[this.agentIndex.row][this.agentIndex.column - 1]++;
            return this.LEFT;
          case this.RIGHT:
            this.totalMoves[this.agentIndex.row][this.agentIndex.column + 1]++;
            return this.RIGHT;
          case this.UP:
            this.totalMoves[this.agentIndex.row - 1][this.agentIndex.column]++;
            return this.UP;
          case this.DOWN:
            this.totalMoves[this.agentIndex.row + 1][this.agentIndex.column]++;
            return this.DOWN;
        }
      }

      // ***** Secondly, If no visited cell found move randomly any of the cell with
      // pit and wumpus probability less than threshold *****//

      // Create an array to store available directions
      const UnvisitedAvailableDirections: number[] = [];

      // Check if left is safe and add it to available directions
      if (
        this.agentIndex.row > 0 &&
        this.wumpusProbability[this.agentIndex.row - 1][
          this.agentIndex.column
        ] < this.threshold &&
        this.pitProbability[this.agentIndex.row - 1][this.agentIndex.column] <
          this.threshold
      ) {
        UnvisitedAvailableDirections.push(this.UP);
      }

      // Check if down is safe and add it to available directions
      if (
        this.agentIndex.column > 0 &&
        this.wumpusProbability[this.agentIndex.row][
          this.agentIndex.column - 1
        ] < this.threshold &&
        this.pitProbability[this.agentIndex.row][this.agentIndex.column - 1] <
          this.threshold
      ) {
        UnvisitedAvailableDirections.push(this.LEFT);
      }

      // Check if right is safe and add it to available directions
      if (
        this.agentIndex.row < 9 &&
        this.wumpusProbability[this.agentIndex.row + 1][
          this.agentIndex.column
        ] < this.threshold &&
        this.pitProbability[this.agentIndex.row + 1][this.agentIndex.column] <
          this.threshold
      ) {
        UnvisitedAvailableDirections.push(this.DOWN);
      }

      // Check if up is safe and add it to available directions
      if (
        this.agentIndex.column < 9 &&
        this.wumpusProbability[this.agentIndex.row][
          this.agentIndex.column + 1
        ] < this.threshold &&
        this.pitProbability[this.agentIndex.row][this.agentIndex.column + 1] <
          this.threshold
      ) {
        UnvisitedAvailableDirections.push(this.RIGHT);
      }

      if (UnvisitedAvailableDirections.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * UnvisitedAvailableDirections.length
        );
        const randomDirection = UnvisitedAvailableDirections[randomIndex];
        // update the total moves and return the chosen direction
        switch (randomDirection) {
          case this.LEFT:
            this.totalMoves[this.agentIndex.row][this.agentIndex.column - 1]++;
            return this.LEFT;
          case this.RIGHT:
            this.totalMoves[this.agentIndex.row][this.agentIndex.column + 1]++;
            return this.RIGHT;
          case this.UP:
            this.totalMoves[this.agentIndex.row - 1][this.agentIndex.column]++;
            return this.UP;
          case this.DOWN:
            this.totalMoves[this.agentIndex.row + 1][this.agentIndex.column]++;
            return this.DOWN;
        }
      }

      /**** Lastly, move randomly ****/
      const availableDirections: number[] = [];
      if (this.agentIndex.row > 0) {
        availableDirections.push(this.UP);
      }
      if (this.agentIndex.column > 0) {
        availableDirections.push(this.LEFT);
      }
      if (this.agentIndex.row < 9) {
        availableDirections.push(this.DOWN);
      }
      if (this.agentIndex.column < 9) {
        availableDirections.push(this.RIGHT);
      }

      if (availableDirections.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * availableDirections.length
        );
        const randomDirection = availableDirections[randomIndex];
        // update the total moves and return the chosen direction
        switch (randomDirection) {
          case this.LEFT:
            this.totalMoves[this.agentIndex.row][this.agentIndex.column - 1]++;
            return this.LEFT;
          case this.RIGHT:
            this.totalMoves[this.agentIndex.row][this.agentIndex.column + 1]++;
            return this.RIGHT;
          case this.UP:
            this.totalMoves[this.agentIndex.row - 1][this.agentIndex.column]++;
            return this.UP;
          case this.DOWN:
            this.totalMoves[this.agentIndex.row + 1][this.agentIndex.column]++;
            return this.DOWN;
        }
      }
    }
    // cell is safe
    else if (!this.isItDangerCell()) {
      console.log("free space");
      // first go to the unvisited index randomly
      const freeSpaceToUnvisitedDirections: number[] = [];
      if (
        this.agentIndex.row < 9 &&
        !this.cellVisited[this.agentIndex.row + 1][this.agentIndex.column]
      ) {
        freeSpaceToUnvisitedDirections.push(this.DOWN);
      }

      if (
        this.agentIndex.column < 9 &&
        !this.cellVisited[this.agentIndex.row][this.agentIndex.column + 1]
      ) {
        freeSpaceToUnvisitedDirections.push(this.RIGHT);
      }

      if (
        this.agentIndex.row > 0 &&
        !this.cellVisited[this.agentIndex.row - 1][this.agentIndex.column]
      ) {
        freeSpaceToUnvisitedDirections.push(this.UP);
      }

      if (
        this.agentIndex.column > 0 &&
        !this.cellVisited[this.agentIndex.row][this.agentIndex.column - 1]
      ) {
        freeSpaceToUnvisitedDirections.push(this.LEFT);
      }

      if (freeSpaceToUnvisitedDirections.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * freeSpaceToUnvisitedDirections.length
        );
        const randomDirection = freeSpaceToUnvisitedDirections[randomIndex];
        // update the total moves and return the chosen direction
        switch (randomDirection) {
          case this.LEFT:
            this.cellVisited[this.agentIndex.row][this.agentIndex.column - 1] =
              true;
            this.totalMoves[this.agentIndex.row][this.agentIndex.column - 1]++;
            return this.LEFT;
          case this.RIGHT:
            this.cellVisited[this.agentIndex.row][this.agentIndex.column + 1] =
              true;
            this.totalMoves[this.agentIndex.row][this.agentIndex.column + 1]++;
            return this.RIGHT;
          case this.UP:
            this.cellVisited[this.agentIndex.row - 1][this.agentIndex.column] =
              true;
            this.totalMoves[this.agentIndex.row - 1][this.agentIndex.column]++;
            return this.UP;
          case this.DOWN:
            this.cellVisited[this.agentIndex.row + 1][this.agentIndex.column] =
              true;
            this.totalMoves[this.agentIndex.row + 1][this.agentIndex.column]++;
            return this.DOWN;
        }
      }
      // if all neighbor have been visited, choose random direction
      else {
        while (true) {
          switch (this.rand(1, 4)) {
            //if selected, move right
            case 1:
              if (this.agentIndex.row < 9) {
                this.totalMoves[this.agentIndex.row + 1][
                  this.agentIndex.column
                ]++;

                this.contiguousRandomMoveCount++;
                return this.DOWN;
              }
              break;
            //if selected, move up
            case 2:
              if (this.agentIndex.column < 9) {
                this.totalMoves[this.agentIndex.row][
                  this.agentIndex.column + 1
                ]++;

                this.contiguousRandomMoveCount++;
                return this.RIGHT;
              }
              break;
            //if selected, move left
            case 3:
              if (this.agentIndex.row > 0) {
                this.totalMoves[this.agentIndex.row - 1][
                  this.agentIndex.column
                ]++;

                this.contiguousRandomMoveCount++;
                return this.UP;
              }
              break;
            //if selected, move down
            case 4:
              if (this.agentIndex.column > 0) {
                this.totalMoves[this.agentIndex.row][
                  this.agentIndex.column - 1
                ]++;
                this.contiguousRandomMoveCount++;
                return this.LEFT;
              }
              break;
          }
        }
      }
    }
    return -1;
  }

  isWumpusClose() {
    if (
      this.agentIndex.column < 9 &&
      this.wumpusProbability[this.agentIndex.row][this.agentIndex.column + 1] >
        0.5
    ) {
      this.shootDirection = this.RIGHT;
      return true;
    }
    if (
      this.agentIndex.column > 0 &&
      this.wumpusProbability[this.agentIndex.row][this.agentIndex.column - 1] >
        0.5
    ) {
      this.shootDirection = this.LEFT;
      return true;
    }
    if (
      this.agentIndex.row < 9 &&
      this.wumpusProbability[this.agentIndex.row + 1][this.agentIndex.column] >
        0.5
    ) {
      this.shootDirection = this.DOWN;
      return true;
    }
    if (
      this.agentIndex.row > 0 &&
      this.wumpusProbability[this.agentIndex.row - 1][this.agentIndex.column] >
        0.5
    ) {
      this.shootDirection = this.UP;
      return true;
    }
    return false;
  }

  removeStench(row, column) {
    const directions = [
      [-1, 0], // Up
      [1, 0], // Down
      [0, -1], // Left
      [0, 1], // Right
    ];

    for (const [dr, dc] of directions) {
      const cr = row + dr;
      const cc = column + dc;

      if (cr >= 0 && cr <= 9 && cc >= 0 && cc <= 9) {
        let flag = 1;

        for (const [r, c] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          const nr = cr + r;
          const nc = cc + c;

          if (
            nr >= 0 &&
            nr <= 9 &&
            nc >= 0 &&
            nc <= 9 &&
            this.board[nr][nc].includes("W")
          ) {
            flag = 0;
            break;
          }
        }

        if (flag) {
          this.board[cr][cc] = this.board[cr][cc].replace("T", "");
          let xd = JSON.stringify(this.getBoard());
          console.log("wumpus killed: ", this.wumpusKilled);
          console.log("after removing stench: ", row, column, xd);
        }
      }
    }

    this.wumpusProbability[row][column] = 0.0;
    console.log("after removing stench: ", row, column, this.board);
  }

  areWeInPitLoop() {
    if (
      this.contiguousRandomMoveCount > 0 &&
      this.totalMoves[this.agentIndex.row][this.agentIndex.column] > 1 &&
      this.board[this.agentIndex.row][this.agentIndex.column].includes("B")
    )
      return true;
    else return false;
  }

  isItDangerCell() {
    if (
      this.board[this.agentIndex.row][this.agentIndex.column].includes("B") ||
      this.board[this.agentIndex.row][this.agentIndex.column].includes("T")
    ) {
      return true;
    }
    return false;
  }

  rand(min: number, max: number) {
    if (min == max) return min;

    var date = new Date();
    var count = date.getMilliseconds() % 10;

    for (var i = 0; i <= count; ++i) Math.random();

    if (min > max) {
      min ^= max;
      max ^= min;
      min ^= max;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  calculateBreezeAndStench() {
    if (
      !this.nearDanger[this.agentIndex.row][this.agentIndex.column] &&
      this.isValidCell(this.agentIndex.row, this.agentIndex.column)
    ) {
      if (
        this.board[this.agentIndex.row][this.agentIndex.column].includes("B")
      ) {
        this.updatePitWumpusPercentage(true, false);
      }

      if (
        this.board[this.agentIndex.row][this.agentIndex.column].includes("T")
      ) {
        this.updatePitWumpusPercentage(false, true);
      }
    }
  }

  updatePitWumpusPercentage(pit: boolean, wumpus: boolean) {
    if (
      this.agentIndex.column > 0 &&
      !this.cellVisited[this.agentIndex.row][this.agentIndex.column - 1]
    ) {
      if (pit == true) {
        this.pitProbability[this.agentIndex.row][
          this.agentIndex.column - 1
        ] += 0.25;
      } else {
        this.wumpusProbability[this.agentIndex.row][
          this.agentIndex.column - 1
        ] += 0.25;
      }
    }
    if (
      this.agentIndex.column < 9 &&
      !this.cellVisited[this.agentIndex.row][this.agentIndex.column + 1]
    ) {
      if (pit == true) {
        this.pitProbability[this.agentIndex.row][
          this.agentIndex.column + 1
        ] += 0.25;
      } else {
        this.wumpusProbability[this.agentIndex.row][
          this.agentIndex.column + 1
        ] += 0.25;
      }
    }
    if (
      this.agentIndex.row > 0 &&
      !this.cellVisited[this.agentIndex.row - 1][this.agentIndex.column]
    ) {
      if (pit == true) {
        this.pitProbability[this.agentIndex.row - 1][
          this.agentIndex.column
        ] += 0.25;
      } else {
        this.wumpusProbability[this.agentIndex.row - 1][
          this.agentIndex.column
        ] += 0.25;
      }
    }
    if (
      this.agentIndex.row < 9 &&
      !this.cellVisited[this.agentIndex.row + 1][this.agentIndex.column]
    ) {
      if (pit == true) {
        this.pitProbability[this.agentIndex.row + 1][
          this.agentIndex.column
        ] += 0.25;
      } else {
        this.wumpusProbability[this.agentIndex.row + 1][
          this.agentIndex.column
        ] += 0.25;
      }
    }
    // update the cell to danger
    this.nearDanger[this.agentIndex.row][this.agentIndex.column] = true;
  }

  init() {
    console.log("INSIDE: ", this.board);
    // wumpus init
    for (let i = 0; i < this.wumpusCount; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (
        (row >= 8 && (col === 0 || col === 1)) ||
        (row === 8 && col === 1) ||
        this.board[row][col] === "W"
      );

      this.board[row][col] = "W";
    }
    // update relative cells to wumpus
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (this.board[row][col].includes("W")) {
          if (col > 0) {
            if (this.board[row][col - 1] == "S") {
              this.board[row][col - 1] = "T";
            } else if (this.board[row][col - 1] == "W") {
              this.board[row][col - 1] += "T";
            }
          }

          if (col < 9) {
            if (this.board[row][col + 1] == "S") {
              this.board[row][col + 1] = "T";
            } else if (this.board[row][col + 1] == "W") {
              this.board[row][col + 1] += "T";
            }
          }

          if (row > 0) {
            if (this.board[row - 1][col] == "S") {
              this.board[row - 1][col] = "T";
            } else if (this.board[row - 1][col] == "W") {
              this.board[row - 1][col] += "T";
            }
          }

          if (row < 9) {
            if (this.board[row + 1][col] == "S") {
              this.board[row + 1][col] = "T";
            } else if (this.board[row + 1][col] == "W") {
              this.board[row + 1][col] += "T";
            }
          }
        }
      }
    }

    // pit init
    for (let i = 0; i < this.pitCount; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (
        (row >= 8 && (col === 0 || col === 1)) ||
        (row === 8 && col === 1) ||
        this.board[row][col].includes("P") ||
        this.board[row][col].includes("W")
      );

      if (this.board[row][col] == "S") {
        this.board[row][col] = "P";
      } else {
        this.board[row][col] += "P";
      }
    }

    // update relative cell to pits
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (this.board[row][col].includes("P")) {
          if (col > 0) {
            if (this.board[row][col - 1] == "S") {
              this.board[row][col - 1] = "B";
            } else if (!this.board[row][col - 1].includes("B")) {
              this.board[row][col - 1] += "B";
            }
          }

          if (col < 9) {
            if (this.board[row][col + 1] == "S") {
              this.board[row][col + 1] = "B";
            } else if (!this.board[row][col + 1].includes("B")) {
              this.board[row][col + 1] += "B";
            }
          }

          if (row > 0) {
            if (this.board[row - 1][col] == "S") {
              this.board[row - 1][col] = "B";
            } else if (!this.board[row - 1][col].includes("B")) {
              this.board[row - 1][col] += "B";
            }
          }

          if (row < 9) {
            if (this.board[row + 1][col] == "S") {
              this.board[row + 1][col] = "B";
            } else if (!this.board[row + 1][col].includes("B")) {
              this.board[row + 1][col] += "B";
            }
          }
        }
      }
    }

    // gold init
    for (let i = 0; i < this.goldCount; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (
        (row === 9 && col === 0) ||
        this.board[row][col].includes("W") ||
        this.board[row][col].includes("P")
      );

      this.board[row][col] += "G";
    }

    this.cboard = JSON.parse(JSON.stringify(this.board));
    // console.log("OUT: ", this.board);
  }

  setBoard(new_board) {
    this.board = this.initialBoard;
    console.log("FIRST: ", this.board);

    this.board = JSON.parse(JSON.stringify(new_board));
    console.log("Second: ", this.board);

    const { wCount, pCount, gCount } = this.countWumpusPitAndGold();
    this.wumpusCount = wCount;
    this.pitCount = pCount;
    this.goldCount = gCount;
    this.difficulty = "";
    this.initialBoard = JSON.parse(JSON.stringify(this.board));
    console.log("Third: ", this.initialBoard);

    this.addPercept();
  }

  addPercept() {
    console.log("FINAL: ", this.board);

    // update relative cells to wumpus
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (this.board[row][col].includes("W")) {
          if (col > 0) {
            if (this.board[row][col - 1] == "S") {
              this.board[row][col - 1] = "T";
            } else if (this.board[row][col - 1] == "W") {
              this.board[row][col - 1] += "T";
            }
          }

          if (col < 9) {
            if (this.board[row][col + 1] == "S") {
              this.board[row][col + 1] = "T";
            } else if (this.board[row][col + 1] == "W") {
              this.board[row][col + 1] += "T";
            }
          }

          if (row > 0) {
            if (this.board[row - 1][col] == "S") {
              this.board[row - 1][col] = "T";
            } else if (this.board[row - 1][col] == "W") {
              this.board[row - 1][col] += "T";
            }
          }

          if (row < 9) {
            if (this.board[row + 1][col] == "S") {
              this.board[row + 1][col] = "T";
            } else if (this.board[row + 1][col] == "W") {
              this.board[row + 1][col] += "T";
            }
          }
        }
      }
    }

    // update relative cell to pits
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (this.board[row][col].includes("P")) {
          if (col > 0) {
            if (this.board[row][col - 1] == "S") {
              this.board[row][col - 1] = "B";
            } else if (!this.board[row][col - 1].includes("B")) {
              this.board[row][col - 1] += "B";
            }
          }

          if (col < 9) {
            if (this.board[row][col + 1] == "S") {
              this.board[row][col + 1] = "B";
            } else if (!this.board[row][col + 1].includes("B")) {
              this.board[row][col + 1] += "B";
            }
          }

          if (row > 0) {
            if (this.board[row - 1][col] == "S") {
              this.board[row - 1][col] = "B";
            } else if (!this.board[row - 1][col].includes("B")) {
              this.board[row - 1][col] += "B";
            }
          }

          if (row < 9) {
            if (this.board[row + 1][col] == "S") {
              this.board[row + 1][col] = "B";
            } else if (!this.board[row + 1][col].includes("B")) {
              this.board[row + 1][col] += "B";
            }
          }
        }
      }
    }
  }

  getBoard() {
    return this.board;
  }

  resetCellVisitedArray() {
    this.cellVisited = Array.from({ length: 10 }, () => Array(10).fill(false));
    this.cellVisited[9][0] = true;
  }

  resetGameEnvironment() {
    this.board = [
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ];
    this.cboard = [
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ];

    this.resetCellVisitedArray();

    this.nearDanger = [
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
    ];

    this.pitProbability = [
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    ];

    this.wumpusProbability = [
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    ];

    this.totalMoves = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    this.agentIndex = { row: 9, column: 0 };
    this.currentIndex = { row: 9, column: 0 };
    // count things
    this.pitCount = 0;
    this.goldCount = 0;
    this.point = 0;
    this.moveCount = 0;
    this.wumpusCount = 0;
    this.contiguousRandomMoveCount = 0;
    this.discoveredGold = 0;
    this.wumpusKilled = 0;

    // directions
    this.UP = 0;
    this.DOWN = 1;
    this.LEFT = 2;
    this.RIGHT = 3;
    this.isShoot = false;

    // results
    this.gameOver = false;
    this.youWin = false;
    this.youLose = false;
    this.gameOverLine = "";

    // this is cheat mode
    this.cheatOn = false;

    console.log("RESETING ENV");
  }

  countWumpusPitAndGold() {
    let wCount = 0;
    let pCount = 0;
    let gCount = 0;

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j] == "W") wCount += 1;
        else if (this.board[i][j] == "P") pCount += 1;
        else if (this.board[i][j] == "G") gCount += 1;
      }
    }

    return { wCount, pCount, gCount };
  }

  initializeExternalBoards() {
    // count w,p,g
    const { wCount, pCount, gCount } = this.countWumpusPitAndGold();
    this.gameOnInit(wCount, pCount, gCount, "Easy");
    // init game
  }

  setDifficultyMode(mode) {
    console.log("Cur MOde::", this.difficulty);
    console.log("Cur Board:: ", this.board);
    this.difficulty = mode;
  }
}

export const play = new Play();
