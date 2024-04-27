export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.initEmptyBoard();
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
    for(let i=0; i<this.height; i++){
      let row = [];
      for(let j=0; j<this.height; j++){
        row.push(".");
      }
      this.board.push(row);
    }
  }

  drop(val) {
    if(val){
      let centre_x = Math.floor(this.width / 2);
      this.board[0][centre_x] = val;
    }
  }
}
