export class Play{
    constructor(){}

    gridSize = 10;

    // count things
    wumpusCount = 0;
    pitCount = 0;
    goldCount = 0;
    point = 0;

    // directions
    UP = 0;
    DOWN = 1;
    LEFT = 2;
    RIGHT = 3;
    shootDirection !: number;
    moveDirection !: number;

    // results
    gameOver = false;
    youWin = false;
    youLose = false;
    gameOverLine= "";

    // this is cheat mode
    cheatOn = false;

    /*
        Cell types:
        =============
        - safe
        - stench
        - breeze
        - agentsafe
        - agentstinky
        - agentbreeze
        - wumpus (blurred)
        - pit (blurred)
        - gold (blurred)
        - agentwumpus
        - agentpit
        - agentgold
    */

    board = [
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S']
    ]
          
    cellVisited = [
        [true,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false]
    ];

    nearDanger = [
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false]
    ];

    // this is the cheat board
    cboard = [
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S'],
        ['S','S','S','S','S','S','S','S','S','S']
    ]

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
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    ]
      
    stenchProbability = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    ]

    threshold = 0.5;
    contiguousRandomMoveCount = 0;
    discoveredGold = 0;
    wumpusKilled = 0;

    totalMoves = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
    ]
    
    // for tracking agent
    agentIndex = {
        row: 0,
        column: 0,
    }
    
    busy: boolean = false;
    

    // audio = new Audio();
    // wumpusAudio = new Audio();
    // goldAudio = new Audio();
    // monsterEndAudio = new Audio();
    // pitEndAudio = new Audio();
    // winAudio = new Audio();
    difficulty = '';

    gameOnInit(wumpusCount: any, pitCount: any, goldCouont: any, difficulty: any){
        this.wumpusCount = wumpusCount;
        this.pitCount = pitCount;
        this.goldCount = goldCouont;
        this.difficulty = difficulty;

        if(this.difficulty == "Easy"){
            this.threshold = 0.25;
        }

        this.init();
    }


    

    init(){

        for(var i=0; i< this.wumpusCount; i++){
          let val = Math.floor(Math.random()*100);
          let col = val % 10;
          let row = Math.floor((val / 10) % 10);
          if(col<2 && row <2){
            i=i-1;
            continue;
          }
          if(this.board[row][col]=='W' || this.board[row][col]=='P'){
            i = i-1;
            continue;
          }
          //// console.log(row, col)
          this.board[row][col] = 'W';
          if(col != 0)
            this.board[row][col-1] = 'stench'
          if(col != 9)
            this.board[row][col+1] = 'stench'
          if(row != 0)
            this.board[row-1][col] = 'stench'
          if(row != 9)
            this.board[row+1][col] = 'stench'
        }

        for(var i=0; i< this.pitCount; i++){
          
          let val = Math.floor(Math.random()*100);
          let col = val % 10;
          let row = Math.floor((val / 10) % 10);
          if(row <2 && col <2){
            i=i-1;
            continue;
          }
          //// console.log(row, col)
          if(this.board[row][col]=='P' || this.board[row][col]=='W'){
            i = i-1;
            continue;
          }
          this.board[row][col] = 'P';
          if(col != 0)
            if(this.board[row][col-1] == 'stench')
              this.board[row][col-1] += 'breeze'
            else
              this.board[row][col-1] = 'breeze'
          if(col != 9)
            if(this.board[row][col+1] == 'stench')
              this.board[row][col+1] += 'breeze'
            else
              this.board[row][col+1] = 'breeze'
          if(row != 0)
            if(this.board[row-1][col] == 'stench')
              this.board[row-1][col] += 'breeze'
            else
              this.board[row-1][col] = 'breeze'
          if(row != 9)
            if(this.board[row+1][col] == 'stench')
              this.board[row+1][col] += 'breeze'
            else
              this.board[row+1][col] = 'breeze'
        }

        for(var i=0; i< this.goldCount; i++){
    
          let val = Math.floor(Math.random()*100);
          let col = val % 10;
          let row = Math.floor((val / 10) % 10);
          if(row <2 && col<2){
            i=i-1;
            continue;
          }
          if(this.board[row][col]=='W' || this.board[row][col]=='P'){
            i = i-1;
            continue;
          }
          this.board[row][col]+='G'
        }

        this.cboard = JSON.parse(JSON.stringify(this.board))
        console.log(this.board);
    }
    


}