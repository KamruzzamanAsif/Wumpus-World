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
      
    TProbability = [
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
          this.board[row][col] = 'W';
          if(col != 0)
            this.board[row][col-1] = 'T'
          if(col != 9)
            this.board[row][col+1] = 'T'
          if(row != 0)
            this.board[row-1][col] = 'T'
          if(row != 9)
            this.board[row+1][col] = 'T'
        }

        for(var i=0; i< this.pitCount; i++){
          
          let val = Math.floor(Math.random()*100);
          let col = val % 10;
          let row = Math.floor((val / 10) % 10);
          if(row <2 && col <2){
            i=i-1;
            continue;
          }
          if(this.board[row][col]=='P' || this.board[row][col]=='W'){
            i = i-1;
            continue;
          }
          this.board[row][col] = 'P';
          if(col != 0)
            if(this.board[row][col-1] == 'T')
              this.board[row][col-1] += 'B'
            else
              this.board[row][col-1] = 'B'
          if(col != 9)
            if(this.board[row][col+1] == 'T')
              this.board[row][col+1] += 'B'
            else
              this.board[row][col+1] = 'B'
          if(row != 0)
            if(this.board[row-1][col] == 'T')
              this.board[row-1][col] += 'B'
            else
              this.board[row-1][col] = 'B'
          if(row != 9)
            if(this.board[row+1][col] == 'T')
              this.board[row+1][col] += 'B'
            else
              this.board[row+1][col] = 'B'
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