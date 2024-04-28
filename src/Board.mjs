export class Board {
  width;
  height;
  board;
  fallBlock;
  hasFalling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.initEmptyBoard();
    this.fallBlock = null;
    this.hasFalling = false;
  }

  toString() {
    let boardStr = "";
    for(let i=0; i<this.height; i++){
      for(let j=0; j<this.height; j++){
        boardStr += this.board[i][j];
      }
      boardStr += "\n";
    }
    return boardStr;
  }

  initEmptyBoard() {
    let board = [];
    for(let i=0; i<this.height; i++){
      let row = [];
      for(let j=0; j<this.height; j++){
        row.push(".");
      }
      board.push(row);
    }
    return board;
  }

  drop(val) {
    if(this.hasFalling){
      throw new Error("already falling");
    }
    this.hasFalling = true;
    this.fallBlock = new FallingBlock(val, this.width, this.height);
    if(val){
      this.board[0][this.fallBlock.x] = this.fallBlock.shape;
    }
  }

  tick() {
    if(this.fallBlock.y < this.height){
      this.board[this.fallBlock.y][this.fallBlock.x] = ".";
      this.fallBlock.y += 1;
      this.board[this.fallBlock.y][this.fallBlock.x] = this.fallBlock.shape;
    } else if (this.fallBlock.y == this.height){
    } else {
      this.hasFalling = false;
    }
  }

  hasFalling(){
    return this.hasFalling;
  }
}


class FallingBlock {
  x;
  y;
  shape;
  constructor(shape, board_width, board_height){
    this.x = Math.floor(board_width / 2);
    this.y = 0;
    this.shape = shape;
  }
}

// TODO: next test, think of how to prep fallblock class