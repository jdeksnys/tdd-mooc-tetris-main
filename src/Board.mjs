export class Board {
  width;
  height;
  board;
  fallBlock;
  hasFallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.initEmptyBoard();
    this.fallBlock = null;
    this.hasFallingBlock = false;
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
    if(this.hasFallingBlock){
      throw new Error("already falling");
    }
    this.hasFallingBlock = true;
    this.fallBlock = new FallingBlock(val, this.width, this.height);
    if(val){
      this.board[0][this.fallBlock.x] = this.fallBlock.shape;
    }
  }

  tick() {
    if(this.fallBlock.y+1 < this.height){
      this.board[this.fallBlock.y][this.fallBlock.x] = ".";
      this.fallBlock.y += 1;
      this.board[this.fallBlock.y][this.fallBlock.x] = this.fallBlock.shape;
    } else if (this.fallBlock.y+1 == this.height){
      this.hasFallingBlock = false;
    }
  }

  hasFalling = () => this.hasFallingBlock;

  heightToEnd() {
    if(!this.hasFallingBlock){
      return 0;
    }
    let height = 0;
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
