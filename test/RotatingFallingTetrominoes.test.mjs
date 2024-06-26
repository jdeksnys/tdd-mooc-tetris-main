
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

function fallLeft(board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}

function fallRight(board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

describe("Rotating falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 8);
  });

  test("rotate left but no moving tetrominoes", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("rotate right but no moving tetrominoes", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("rotate right after drop", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
        `....T.....
         ...TT.....
         ....T.....
         ..........
         ..........
         ..........
         ..........
         ..........`
    );
  });

  test("rotate left after drop", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ..........
         ..........
         ..........
         ..........
         ..........`
    );
  });

  test("no vertical space for wallkick (left rotate)", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    
    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });

  test("no vertical space for wallkick (right rotate)", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    
    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });

  test("rotate left after drop+tick", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
        `..........
        ....T.....
        ....TT....
        ....T.....
        ..........
        ..........
        ..........
         ..........`
    );
  });

  test("rotate right after drop+tick", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........
       ..........`);
  });

  test("no room to rotate right (L side test)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.rotateRight();
    board.rotateRight();
    fallToBottom(board);
    
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    fallLeft(board);
    
    board.tick();
    board.tick();
    board.tick();
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       T.........
       TTT.......
       T.TT......
       ..TT......
       ..TTT.....`
    );
  });


  test("no room to rotate left (L side test)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.rotateRight();
    board.rotateRight();
    fallToBottom(board);
    
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    fallLeft(board);
    
    board.tick();
    board.tick();
    board.tick();
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       T.........
       TTT.......
       T.TT......
       ..TT......
       ..TTT.....`
    );
  });

  test("no room to rotate right (R side test)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.rotateLeft();
    board.rotateLeft();
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    fallRight(board);

    board.tick();
    board.tick();
    board.tick();
    console.log(board.toString());
    board.rotateRight()
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .........T
       .......TTT
       ......TT.T
       ......TT..
       .....TTT..`
    );
  });


  test("no room to rotate left (R side test)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.rotateLeft();
    board.rotateLeft();
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    fallRight(board);

    board.tick();
    board.tick();
    board.tick();
    console.log(board.toString());
    board.rotateLeft()
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .........T
       .......TTT
       ......TT.T
       ......TT..
       .....TTT..`
    );
  });

  test("no room to rotate right (squeezed)", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.moveLeft();
    fallToBottom(board);

    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.moveRight();
    fallToBottom(board);

    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.tick();
    board.rotateRight();
    
    expect(board.toString()).to.equalShape(
      `..........
       .....I....
       .....I....
       .....I....
       ....III...
       ....I.I...
       ....I.I...
       ....I.I...`
    );
  });

  test("no room to rotate left (squeezed)", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.moveLeft();
    fallToBottom(board);

    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.moveRight();
    fallToBottom(board);

    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.tick();
    board.rotateLeft();
    
    expect(board.toString()).to.equalShape(
      `..........
       .....I....
       .....I....
       .....I....
       ....III...
       ....I.I...
       ....I.I...
       ....I.I...`
    );
  });

  test("wallkick rotate right (L wall)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    fallLeft(board);
    board.rotateRight();
    
    expect(board.toString()).to.equalShape(
      `..........
      .T........
      TTT.......
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("wallkick rotate left (L wall)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    fallLeft(board);
    board.rotateLeft();
    
    expect(board.toString()).to.equalShape(
      `..........
      TTT.......
      .T........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("wallkick rotate right (R wall)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    fallRight(board);
    board.rotateRight();
    
    expect(board.toString()).to.equalShape(
      `..........
      ........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("wallkick rotate left (R wall)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    fallRight(board);
    board.rotateLeft();
    
    expect(board.toString()).to.equalShape(
      `..........
      .......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });
});


