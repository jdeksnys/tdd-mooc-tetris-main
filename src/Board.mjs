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
    if(!this.hasFalling){
      return;
    }
    let heightToEnd_ = this.heightToEnd();
    if(heightToEnd_ > 0){
      this.board[this.fallBlock.y][this.fallBlock.x] = ".";
      this.fallBlock.y += 1;
      this.board[this.fallBlock.y][this.fallBlock.x] = this.fallBlock.shape;
    } else if (this.fallBlock.y+1 == this.height || heightToEnd_ == 0){
      this.hasFallingBlock = false;
    }
  }

  hasFalling = () => this.hasFallingBlock;

  heightToEnd() {
    if(!this.hasFallingBlock){
      return 0;
    }
    let height = 0;
    for(let i=this.fallBlock.y; i<this.height-1; i++){
      if(this.board[i+1][this.fallBlock.x] != "."){
        return height;
      }
      height += 1;
    }
    return height;
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
