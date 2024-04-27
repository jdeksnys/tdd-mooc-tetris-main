export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.initEmptyBoard();
    this.fallBlock = new FallingBlock;
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
    if(val){
      let centre_x = Math.floor(this.width / 2);
      this.board[0][centre_x] = val;
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
}