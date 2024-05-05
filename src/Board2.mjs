import { RotatingShape } from "./RotatingShape.mjs";

export class Board2 {
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

  drop(rot_shape2) {
    if (this.hasFallingBlock) {
      throw new Error("already falling");
    }
    this.hasFallingBlock = true;
    this.fallBlock = new FallingBlock2(rot_shape2, this.width, this.height);

    for(let i=this.fallBlock.y_pos; i<this.fallBlock.y_pos+this.fallBlock.shape.length; i++){
      for(let j=0; j<this.fallBlock.shape[0].length; j++){
        if(this.fallBlock.shape[i][j] != "."){
          this.board[i-1][j+this.fallBlock.x_pos] = this.fallBlock.shape[i][j];
        }
      }
    }

    this.fallBlock.y_pos -= 1;
  }

  get_shape_actual_rows(){
    let res = {};
    for(let j=0; j<this.fallBlock.shape[0].length; j++){
      let rows = 0;
      for(let i=0; i<this.fallBlock.shape.length; i++){
        if (this.fallBlock.shape[i][j] != ".") {;
          rows += 1;
        }
      }
      if(rows != 0){
        res[j.toString()] = rows;
      }
    }
    return res;
  }

  get_shape_actual_cols(){
    let res = {};
    for(let i=0; i<this.fallBlock.shape.length; i++){
      let cols = 0;
      for(let j=0; j<this.fallBlock.shape[0].length; j++){
        if (this.fallBlock.shape[i][j] != ".") {;
          cols += 1;
        }
      }
      if(cols != 0){
        res[i.toString()] = cols;
      }
    }
    return res;
  }

  get_shape_R_most_coord(shape_row){
    for(let j=this.fallBlock.shape[0].length-1; j>=0; j--){
      if (this.fallBlock.shape[shape_row][j] != ".") {
        return this.fallBlock.x_pos + j;
      }
    }
  }

  get_shape_L_most_coord(shape_row){
    for(let j=0; j<this.fallBlock.shape[0].length; j++){
      if (this.fallBlock.shape[shape_row][j] != ".") {
        return this.fallBlock.x_pos + j;
      }
    }
  }

  get_shape_B_most_coord(shape_col){
    for(let i=this.fallBlock.shape.length-1; i>=0; i--){
      if (this.fallBlock.shape[i][shape_col] != ".") {
        return this.fallBlock.y_pos + i;
      }
    }
    return null;
  }

  get_shape_U_most_coord(shape_col){
    for(let i=0; i<this.fallBlock.shape.length; i++){
      if (this.fallBlock.shape[i][shape_col] != ".") {
        return this.fallBlock.y_pos + i;
      }
    }
    return null;
  }

  get_dist_to_wall_R(){
    let dist_to_walls = {};
    for(let i=0; i<this.fallBlock.shape.length; i++){
      let r_ended = false;
      let dist = 0;
      let r_coord = this.get_shape_R_most_coord(i);
      if(r_coord == null || r_coord == undefined){
        continue;
      }
      for(let j=r_coord+1; j<this.board[0].length; j++){
        if (this.board[i+this.fallBlock.y_pos][j] != "."){
          r_ended = true;
        }
        if(!r_ended){
          dist += 1;
        }
      }
      dist_to_walls[i.toString()] = dist;
    }
    return dist_to_walls;
  }

  get_dist_to_wall_L(){
    let dist_to_walls = {};
    for(let i=0; i<this.fallBlock.shape.length; i++){
      let l_ended = false;
      let dist = 0;
      let l_coord = this.get_shape_L_most_coord(i);
      if(l_coord == null || l_coord == undefined){
        continue;
      }
      for(let j=l_coord-1; j>=0; j--){
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

  get_dist_to_wall_U(){
    let dist_to_walls = {};
    for(let j=0; j<this.fallBlock.shape[0].length; j++){
      let l_ended = false;
      let dist = 0;
      let u_coord = this.get_shape_U_most_coord(j);
      if(u_coord == null || u_coord == undefined){
        continue;
      }
      for(let i=u_coord-1; i>=0; i--){
        if (this.board[i][j+this.fallBlock.x_pos] != "."){
          l_ended = true;
        }
        if(!l_ended){
          dist += 1;
        }
      }
      dist_to_walls[j.toString()] = dist;
    }
    return dist_to_walls;
  }

  get_dist_to_wall_B(){
    let dist_to_walls = {};
    for(let j=0; j<this.fallBlock.shape[0].length; j++){
      let l_ended = false;
      let dist = 0;
      let b_coord = this.get_shape_B_most_coord(j);
      if(b_coord == null || b_coord == undefined){
        continue;
      }
      for(let i=b_coord+1; i<this.board.length; i++){
        if (this.board[i][j+this.fallBlock.x_pos] != "."){
          l_ended = true;
        }
        if(!l_ended){
          dist += 1;
        }
      }
      dist_to_walls[j.toString()] = dist;
    }
    return dist_to_walls;
  }

  get_extreme_coords(){
    let l_coords = [];
    let r_coords = [];
    let u_coords = [];
    let b_coords = [];

    for(let i=0; i<this.fallBlock.shape.length; i++){
      let l = this.get_shape_L_most_coord(i);
      let r = this.get_shape_R_most_coord(i);
      if(l != null && l != undefined){
        l_coords.push(l);
      }
      if(r != null && r != undefined){
        r_coords.push(r);
      }
    }

    for(let j=0; j<this.fallBlock.shape[0].length; j++){
      let u = this.get_shape_U_most_coord(j);
      let b = this.get_shape_B_most_coord(j);
      if(u != null && u != undefined){
        u_coords.push(u);
      }
      if(b != null && b != undefined){
        b_coords.push(b);
      }
    }

    let l_most_coord = Math.min(...Object.values(l_coords));
    let r_most_coord = Math.max(...Object.values(r_coords));
    let u_most_coord = Math.min(...Object.values(u_coords));
    let b_most_coord = Math.max(...Object.values(b_coords));
    let res = {};
    res["L"] = l_most_coord;
    res["R"] = r_most_coord;
    res["U"] = u_most_coord;
    res["B"] = b_most_coord;

    return res;
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
    let extreme_coords = this.get_extreme_coords();
    let min_y = (this.fallBlock.y_pos == -1) ? 0 : this.fallBlock.y_pos;
    let col_counter = 0;
    
    for(let j=0; j<this.fallBlock.shape[0].length; j++) {
      let start_i = this.get_shape_B_most_coord(j);
      if(start_i == null || start_i == undefined){
        continue;
      }
      for(let i = start_i; i>=extreme_coords["U"]; i--) {
        let j_ = extreme_coords["L"]+col_counter;
        this.board[i+1][j_] = this.board[i][j_];
        this.board[i][j_] = ".";

      }

      col_counter += 1;
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

    for(let i=0; i<this.fallBlock.shape.length; i++){
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
    let actual_cols = this.get_shape_actual_cols();
    for(let i=0; i<this.fallBlock.shape.length; i++){
      if(!actual_cols[i]){
        continue;
      }
      for(let j=this.get_shape_L_most_coord(i); j<this.get_shape_L_most_coord(i)+actual_cols[i]; j++){
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
    let actual_cols = this.get_shape_actual_cols();
    for(let i=0; i<this.fallBlock.shape.length; i++){
      if(!actual_cols[i]){
        continue;
      }
      for(let j=this.get_shape_R_most_coord(i); j>=this.get_shape_L_most_coord(i); j--){
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
    if(this.can_rotate()){
      this.updateFallblockInBoard(true);
      let i = this.fallBlock.i - 1;
      if(i < 0){
        i = 3;
      }
      this.fallBlock.i = i;
      this.updateFallblockInBoard(false);

    } else if(this.can_wall_kick()){
      let dist_L_old = Math.min(...Object.values(this.get_dist_to_wall_L()));
      let dist_R_old = Math.min(...Object.values(this.get_dist_to_wall_R()));
      let dist_U_old = Math.min(...Object.values(this.get_dist_to_wall_U()));
      let actual_cols_old = Math.max(...Object.values(this.get_shape_actual_cols()));
      let actual_rows_old = Math.max(...Object.values(this.get_shape_actual_rows()));
      this.updateFallblockInBoard(true);
      let i = this.fallBlock.i - 1;
      if(i < 0){
        i = 3;
      }
      this.fallBlock.i = i;
      let x = this.fallBlock.x_pos < 0
      ? 0
      : this.fallBlock.x_pos >= this.width
        ? this.width-1
        : this.fallBlock.x_pos;
      let y = this.fallBlock.y_pos < 0
      ? 0
      : this.fallBlock.y_pos >= this.height
        ? this.height-1
        : this.fallBlock.y_pos;
      if(dist_L_old + actual_cols_old < actual_rows_old){
        x = x - dist_L_old;
      } else if(dist_R_old + actual_cols_old < actual_rows_old){
        x = x - dist_R_old;
      }
      if(dist_U_old + actual_rows_old < actual_cols_old){
        y = y - dist_U_old;
      }
      this.fallBlock.x_pos = x;
      this.fallBlock.y_pos = y;
      this.updateFallblockInBoard(false);
    }
  }

  can_rotate() {
    let dist_L = this.get_dist_to_wall_L();
    let dist_R = this.get_dist_to_wall_R();
    let dist_U = this.get_dist_to_wall_U();
    let dist_B = this.get_dist_to_wall_B();
    let actual_cols = this.get_shape_actual_cols();
    let actual_rows = this.get_shape_actual_rows();
    let max_rows = Math.max(...Object.values(actual_rows));
    let can_rotate = true;
    for(let i=0; i<this.fallBlock.shape.length; i++){
      if(dist_L[i] <= 0 || dist_R[i] <= 0 || max_rows > (actual_cols[i]+dist_L[i]+dist_R[i])){
        can_rotate = false;
        break;
      }
    }
    for(let j=0; j<this.fallBlock.shape[0].length; j++){
      if(dist_U[j] <= 0 || dist_B[j] <= 0){
        can_rotate = false;
        break;
      }
    }
    return can_rotate;
  }

  can_wall_kick() {
    let dist_L = this.get_dist_to_wall_L();
    let dist_R = this.get_dist_to_wall_R();
    let dist_U = this.get_dist_to_wall_U();
    let dist_B = this.get_dist_to_wall_B();
    let actual_cols = this.get_shape_actual_cols();
    let actual_rows = this.get_shape_actual_rows();
    let max_rows = Math.max(...Object.values(actual_rows));
    let max_cols = Math.max(...Object.values(actual_cols));
    let can_kick = true;
    for(let i=0; i<this.fallBlock.shape.length; i++){
      let test0 = dist_L[i];
      let test1 = dist_R[i];
      if(max_rows > (actual_cols[i]+test0+test1)){
        can_kick = false;
        break;
      }
    }
    for(let j=0; j<this.fallBlock.shape[0].length; j++){
      if(max_cols > (actual_rows[j]+dist_U[j]+dist_B[j])){
        can_kick = false;
        break;
      }
    }
    return can_kick;
  }

  rotateRight() {
    if(!this.fallBlock){
      return;
    }

    if(this.can_rotate()){
      this.updateFallblockInBoard(true);
      let i = this.fallBlock.i + 1;
      if(i > 3){
        i = 0;
      }
      this.fallBlock.i = i;
      this.updateFallblockInBoard(false);

    } else if(this.can_wall_kick()){
      let rot_shape = new RotatingShape(this.fallBlock.shape.toString());
      this.updateFallblockInBoard(true);

      let dist_L_old = Math.min(...Object.values(this.get_dist_to_wall_L()));
      let dist_R_old = Math.min(...Object.values(this.get_dist_to_wall_R()));
      let actual_cols_old = Math.max(...Object.values(this.get_shape_actual_cols()));
      let actual_rows_old = this.get_shape_actual_rows();
      let rotated_shape = rot_shape.rotateRight();
      let x = this.fallBlock.x_pos < 0
        ? 0
        : this.fallBlock.x_pos >= this.width
          ? this.width-1
          : this.fallBlock.x_pos;
      let y = this.fallBlock.y_pos;

      if(dist_L_old + actual_cols_old < actual_rows_old){
        x = x - dist_L_old;
      } else if(dist_R_old + actual_cols_old < actual_rows_old){
        x = x - dist_R_old;
      }
      this.fallBlock = new FallingBlock(rotated_shape, this.width, this.height, x, y);
      this.updateFallblockInBoard(false);

    }
  }

  rotateRight2() {
    if(!this.fallBlock){
      return;
    }
    if(this.can_rotate()){
      this.updateFallblockInBoard(true);
      let i = this.fallBlock.i - 1;
      if(i < 0){
        i = 3;
      }
      this.fallBlock.i = i;
      this.updateFallblockInBoard(false);
    } else if(this.can_wall_kick()){
    }
  }

  updateFallblockInBoard(clean=false){
    for(let i=0; i<this.fallBlock.shape.length; i++){
      for(let j=0; j<this.fallBlock.shape[0].length; j++){
        if(this.fallBlock.shape[i][j] != "."){
          this.board[i+this.fallBlock.y_pos][j+this.fallBlock.x_pos] = clean ? "." : this.fallBlock.shape[i][j];
        }
      }
    }
  }
}

class FallingBlock2 {
  x_pos;
  y_pos;
  rotatingShape;

  constructor(rotatingShape, board_width, board_height, x_pos=null, y_pos=null) {
    rotatingShape.i = 0;
    this.rotatingShape = rotatingShape;
    let shape = this.rotatingShape.shapes[this.rotatingShape.i];
    let temp = shape[0].length==1 ? 0 : Math.round(shape[0].length/2);
    this.x_pos = x_pos!=null ? x_pos : (Math.floor(board_width / 2) - temp);
    this.y_pos = y_pos!=null ? y_pos : 0;
  }

  get shape(){
    return this.rotatingShape.shapes[this.rotatingShape.i];
  }

  get i(){
    return this.rotatingShape.i;
  }

  set i(value) {
    this.rotatingShape.i = value;
  }
}