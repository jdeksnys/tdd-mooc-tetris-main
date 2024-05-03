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

  get_shape_actual_cols(){
    let res = {};
    for(let i=0; i<this.get_shape_actual_rows(); i++){
      let cols = 0;
      for(let j=0; j<this.fallBlock.shape.cols; j++){
        if (this.fallBlock.shape.shape[i][j] != ".") {;
          cols += 1;
        }
      }
      res[(i+this.fallBlock.y_pos).toString()] = cols;
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

  get_shape_L_most_coord(shape_row){
    for(let j=0; j<this.fallBlock.shape.cols; j++){
      if (this.fallBlock.shape.shape[shape_row][j] != ".") {
        return this.fallBlock.x_pos + j;
      }
    }
  }

  get_shape_B_most_coord(shape_col){
    for(let i=this.fallBlock.shape.rows-1; i>=0; i--){
      if (this.fallBlock.shape.shape[i][shape_col] != ".") {
        return this.fallBlock.y_pos + i;
      }
    }
    return 0;
  }

  get_dist_to_wall_R(){
    let dist_to_walls = {};
    let actual_rows = this.get_shape_actual_rows();
    for(let i=0; i<actual_rows; i++){
      let r_ended = false;
      let dist = 0;
      for(let j=this.get_shape_R_most_coord(i)+1; j<this.board[0].length; j++){
        if (this.board[i+this.fallBlock.y_pos][j] != "."){
          r_ended = true;
        }
        if(!r_ended){
          dist += 1;
        }
      }
      dist_to_walls[(i+this.fallBlock.y_pos).toString()] = dist;
    }
    return dist_to_walls;
  }

  get_dist_to_wall_L(){
    let dist_to_walls = {};
    let actual_rows = this.get_shape_actual_rows();
    for(let i=0; i<actual_rows; i++){
      let l_ended = false;
      let dist = 0;
      for(let j=this.get_shape_L_most_coord(i)-1; j>=0; j--){
        if (this.board[i+this.fallBlock.y_pos][j] != "."){
          l_ended = true;
        }
        if(!l_ended){
          dist += 1;
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
    let heights = this.heightToEnd();
    if (!heights || Math.min(...Object.values(heights)) == 0) {
      this.hasFallingBlock = false;
      return;
    }
    let min_h = Math.min(...Object.values(heights));
    for(let j=0; j<this.fallBlock.shape.cols; j++) {
      for(let i = this.get_shape_B_most_coord(j); i>=this.fallBlock.y_pos; i--) {
        let j_ = this.fallBlock.x_pos+j;
        this.board[i+1][j_] = this.board[i][j_];
        this.board[i][j_] = ".";

      }
    }
    this.fallBlock.y_pos += 1;
  }

  hasFalling = () => this.hasFallingBlock;

  heightToEnd () {
    if (!this.hasFallingBlock) {
      return null;
    }
    let heights = {};
    
    // get left most coord in all rows; update height function: loop until coord+actual rows
    let l_coords = [];
    let r_coords = [];

    for(let i=0; i<this.fallBlock.shape.rows; i++){
      let l = this.get_shape_L_most_coord(i);
      let r = this.get_shape_R_most_coord(i);
      if(l != null && l != undefined){
        l_coords.push(l);
      }
      if(r != null && r != undefined){
        r_coords.push(r);
      }
    }

    let l_most_coord = Math.min(...Object.values(l_coords));
    let r_most_coord = Math.max(...Object.values(r_coords));

    for(let j=l_most_coord; j<=r_most_coord; j++){
      let col_height = 0;
      for (let i = this.get_shape_B_most_coord(j-this.fallBlock.x_pos)+1; i < this.height; i++) {
        if(this.board[i][j] == "."){
          col_height += 1;
        }
      }
      heights[j.toString()] = col_height;
    }
    return heights;
  }

  moveLeft() {
    if(!this.hasFalling()){
      return;
    }
    let dist_to_wall = Math.min(...Object.values(this.get_dist_to_wall_L()));
    if(dist_to_wall <= 0){
      return;
    }
    let actual_rows = this.get_shape_actual_rows();
    let actual_cols = this.get_shape_actual_cols();
    for(let i=0; i<actual_rows; i++){
      let actual_cols_i = actual_cols[i+this.fallBlock.y_pos];
      for(let j=this.get_shape_L_most_coord(i); j<this.get_shape_L_most_coord(i)+actual_cols_i; j++){
          this.board[i+this.fallBlock.y_pos][j-1] = this.board[i+this.fallBlock.y_pos][j];
          this.board[i+this.fallBlock.y_pos][j] = ".";
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
    let actual_rows = this.get_shape_actual_rows();
    for(let i=0; i<actual_rows; i++){
      for(let j=this.get_shape_R_most_coord(i); j>=this.fallBlock.x_pos; j--){
          this.board[i+this.fallBlock.y_pos][j+1] = this.board[i+this.fallBlock.y_pos][j];
          this.board[i+this.fallBlock.y_pos][j] = ".";
      }
    }
    this.fallBlock.x_pos += 1;
  }

  moveDown() {
    this.tick();
  }

  rotateLeft() {
    if(!this.fallBlock){
      return;
    }
    let rot_shape = new RotatingShape(this.fallBlock.shape.toString());
    this.updateFallblockInBoard(true);
    this.fallBlock = new FallingBlock(rot_shape.rotateLeft(), this.width, this.height, this.fallBlock.x_pos, this.fallBlock.y_pos);
    this.updateFallblockInBoard(false);
  }

  can_rotate() {
    let dist_L = this.get_dist_to_wall_L();
    let dist_R = this.get_dist_to_wall_R();
    let can_rotate = true;

    for(let j=0; j<this.fallBlock.shape.cols; j++){
      if(dist_L[j] <= 0 || dist_R[j] <= 0){
        can_rotate = false;
        break;
      }
    }
    return can_rotate;
  }

  rotateRight() {
    if(!this.fallBlock){
      return;
    }
    let test = this.can_rotate();
    if(!test){
      return;
    }

    let rot_shape = new RotatingShape(this.fallBlock.shape.toString());
    this.updateFallblockInBoard(true);
    this.fallBlock = new FallingBlock(rot_shape.rotateRight(), this.width, this.height, this.fallBlock.x_pos, this.fallBlock.y_pos);
    this.updateFallblockInBoard(false);
  }

  updateFallblockInBoard(clean=false){
    for(let i=0; i<this.fallBlock.shape.rows; i++){
      for(let j=0; j<this.fallBlock.shape.cols; j++){
        if(this.fallBlock.shape.shape[i][j] != "."){
          this.board[i+this.fallBlock.y_pos][j+this.fallBlock.x_pos] = clean ? "." : this.fallBlock.shape.shape[i][j];
        }
      }
    }
  }
}

class FallingBlock {
  x_pos;
  y_pos;
  shape;
  constructor(shape, board_width, board_height, x_pos=null, y_pos=null) {
    let temp = shape.cols==1 ? 0 : Math.round(shape.cols/2);
    this.x_pos = x_pos!=null ? x_pos : (Math.floor(board_width / 2) - temp);
    this.y_pos = y_pos!=null ? y_pos : 0;
    this.shape = shape;
  }
}
