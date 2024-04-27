export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.initEmptyBoard();
    this.fallBlock = null;
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
    this.fallBlock = new FallingBlock(val, this.width, this.height);
    if(val){
      this.board[0][this.fallBlock.x] = this.fallBlock.shape;
    }
  }

  tick() {
    let centre_x = Math.floor(this.width / 2);
    let val = this.board[0][centre_x];
    this.board[0][centre_x] = ".";
    this.board[1][centre_x] = val;
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