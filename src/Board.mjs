export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];
  }

  toString() {
    let boardStr = "";
    for(let i=0; i<this.height; i++){
      for(let j=0; j<this.height; j++){
        boardStr += ".";
      }
      boardStr += "\n";
    }
    return boardStr;
  }

  getEmptyBoard() {
    for(let i=0; i<this.height; i++){
      let row = [];
      for(let j=0; j<this.height; j++){
        row.push('.');
      }
      this.board.push(row);
    }
  }

  drop() {
    let centre_x = Math.floor(this.width / 2);
  }
}
