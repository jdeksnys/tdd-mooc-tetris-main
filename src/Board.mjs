import { RotatingShape } from "./RotatingShape.mjs";

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
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        boardStr += this.board[i][j];
      }
      boardStr += "\n";
    }
    return boardStr;
  }

  initEmptyBoard() {
    let board = [];
    for (let i = 0; i < this.height; i++) {
      let row = [];
      for (let j = 0; j < this.width; j++) {
        row.push(".");
      }
      board.push(row);
    }
    return board;
  }

  drop(val) {
    if (typeof val === 'string') {
      debugger;
      val = new RotatingShape(val);
    }
    if (this.hasFallingBlock) {
      throw new Error("already falling");
    }
    this.hasFallingBlock = true;
    this.fallBlock = new FallingBlock(val, this.width, this.height);
    let actual_rows = this.get_shape_actual_rows();
    if (val) {
      for(let j=this.fallBlock.y_pos; j<actual_rows; j++){
        for(let i=0; i<this.fallBlock.shape.cols; i++){
          this.board[j][i+this.fallBlock.x_pos] = this.fallBlock.shape.shape[j][i];
        }
      }
    }
  }

  get_shape_actual_rows(){
    let res = 0;
    for(let i=0; i<this.fallBlock.shape.rows; i++){
      let line_empty = true;
      for(let j=0; j<this.fallBlock.shape.cols; j++){
        let test = this.fallBlock.shape.shape[i][j];
        if (test != ".") {
          line_empty = false;
        }
      }
      if(!line_empty){
        res += 1;
      }
    }
    return res;
  }

  get_shape_R_most_coord(shape_row){
    for(let j=this.fallBlock.shape.cols-1; j>=0; j--){
      if (this.fallBlock.shape.shape[shape_row][j] != ".") {
        return this.fallBlock.x_pos + j;
      }
    }
  }

  get_dist_to_wall_R(){
    let dist_to_walls = {};
    let actual_rows = this.get_shape_actual_rows();
    for(let i=this.fallBlock.y_pos; i<this.fallBlock.y_pos+actual_rows; i++){
      let r_ended = false;
      let dist = 0;
      for(let j=this.get_shape_R_most_coord(i)+1; j<this.board[0].length; j++){
        if(!r_ended){
          dist += 1;
        }
        if (this.board[i][j] != "."){
          r_ended = true;
        }
      }
      dist_to_walls[i.toString()] = dist;
    }
    return dist_to_walls;
  }

  get_dist_to_wall_L(){
    let dist_to_walls = {};
    for(let i=this.fallBlock.y_pos; i<this.fallBlock.y_pos+this.fallBlock.shape.rows; i++){
      let l_started = false;
      let l_ended = false;
      let dist = 0;
      for(let j=this.fallBlock.x_pos+this.fallBlock.shape.cols-1; j>=0; j--){
        if(l_started && !l_ended){
          dist += 1;
        }
        if (this.board[i][j] != "."){
          if(!l_started){
            l_started = true;
          } else if(!l_ended){
            l_ended = true;
          }
        }
      }
      dist_to_walls[i.toString()] = dist;
    }
    return dist_to_walls;
  }

  tick() {
    if (!this.hasFalling) {
      return;
    }
    let heightToEnd_ = this.heightToEnd();
    if (heightToEnd_ == 0) {
      this.hasFallingBlock = false;
      return;
    }
    let actual_rows = this.get_shape_actual_rows();
      for(let i = this.fallBlock.y_pos+actual_rows-1; i>=0; i--) {
        for(let j=0; j<this.fallBlock.shape.cols; j++) {
          let y = this.fallBlock.x_pos+j;
          this.board[i+1][y] = this.board[i][y];
          this.board[i][y] = ".";
        }
      }
      this.fallBlock.y_pos += 1;
  }

  hasFalling = () => this.hasFallingBlock;

  heightToEnd () {
    if (!this.hasFallingBlock) {
      return 0;
    }
    let height = 0;
    let has_start = false;

    for (let i = this.fallBlock.y_pos; i < this.height; i++) {
      let line_empty = true;
    
      for(let j=0; j<this.fallBlock.shape.cols; j++){
        let test = this.board[i][this.fallBlock.x_pos+j];
        if (test != ".") {
          line_empty = false;
        }
      }
      if(line_empty && !has_start){
        has_start = true;
      } else if(!line_empty && has_start){
        return height;
      }
      height += 1 ? has_start : 0;
    }
    return height;
  }

  moveLeft() {
    if(!this.hasFalling()){
      return;
    }
    let dist_to_wall = Math.min(Object.values(this.get_dist_to_wall_L()));
    if(dist_to_wall <= 0){
      return;
    }
    for(let i=this.fallBlock.y_pos; i<this.fallBlock.y_pos+this.fallBlock.shape.rows; i++){
      for(let j=this.fallBlock.x_pos; j<this.fallBlock.x_pos+this.fallBlock.shape.cols; j++){
        if(this.fallBlock.x_pos > 0){
          this.board[i][j-1] = this.board[i][j];
          this.board[i][j] = ".";
        }
      }
    }
    this.fallBlock.x_pos -= 1;
  }
  
  moveRight() {
    if(!this.hasFalling()){
      return;
    }
    let dist_to_wall = Math.min(...Object.values(this.get_dist_to_wall_R()));
    if(dist_to_wall <= 0){
      return;
    }
    let actual_rows = this.get_shape_actual_rows()
    for(let i=this.fallBlock.y_pos; i<this.fallBlock.y_pos+actual_rows; i++){
      for(let j=this.get_shape_R_most_coord(i); j>this.get_shape_R_most_coord(i)-this.fallBlock.shape.cols; j--){
          this.board[i][j+1] = this.board[i][j];
          this.board[i][j] = ".";
      }
    }
    this.fallBlock.x_pos += 1;
  }

  moveDown() {
    this.tick();
  }
}

class FallingBlock {
  x_pos;
  y_pos;
  shape;
  constructor(shape, board_width, board_height) {
    let temp = shape.cols==1 ? 0 : Math.round(shape.cols/2);
    this.x_pos = Math.floor(board_width / 2) - temp;
    this.y_pos = 0;
    this.shape = shape;
  }
}
