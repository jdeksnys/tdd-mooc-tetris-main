
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { Board2 } from "../src/Board2.mjs";
import { Tetromino2 } from "../src/Tetromino2.mjs";

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
  let board2;
  beforeEach(() => {
    board = new Board(10, 8);
    board2 = new Board2(10, 8);
  });

  test("rotate left but no moving tetrominoes", () => {
    board2.rotateLeft();
    expect(board2.toString()).to.equalShape(
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
    board2.rotateRight();
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateRight();
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateLeft();
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);
    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateLeft();
    
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);
    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateRight();
    
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.T_SHAPE);
    board2.tick();
    board2.tick();
    board2.rotateLeft();
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.T_SHAPE);
    board2.tick();
    board2.tick();
    board2.rotateRight();
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.T_SHAPE);
    board2.moveLeft();
    board2.rotateRight();
    board2.rotateRight();
    fallToBottom(board2);
    
    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateLeft();
    board2.moveLeft();
    board2.moveLeft();
    fallToBottom(board2);
    
    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateLeft();
    fallLeft(board2);
    
    board2.tick();
    board2.tick();
    board2.tick();
    board2.rotateRight()

    expect(board2.toString()).to.equalShape(
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
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
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
    board2.drop(Tetromino2.T_SHAPE);
    board2.moveRight();
    board2.moveRight();
    board2.rotateLeft();
    board2.rotateLeft();
    fallToBottom(board2);

    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateRight();
    board2.moveRight();
    board2.moveRight();
    board2.moveRight();
    fallToBottom(board2);

    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateRight();
    fallRight(board2);

    board2.tick();
    board2.tick();
    board2.tick();
    console.log(board2.toString());
    board2.rotateRight()
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.T_SHAPE);
    board2.moveRight();
    board2.moveRight();
    board2.rotateLeft();
    board2.rotateLeft();
    fallToBottom(board2);

    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateRight();
    board2.moveRight();
    board2.moveRight();
    board2.moveRight();
    fallToBottom(board2);

    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateRight();
    fallRight(board2);

    board2.tick();
    board2.tick();
    board2.tick();
    console.log(board2.toString());
    board2.rotateLeft()
    
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.I_SHAPE);
    board2.rotateRight();
    board2.moveLeft();
    fallToBottom(board2);

    board2.drop(Tetromino2.I_SHAPE);
    board2.rotateRight();
    board2.moveRight();
    fallToBottom(board2);

    board2.drop(Tetromino2.I_SHAPE);
    board2.rotateRight();
    board2.tick();
    board2.rotateRight();
    
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.I_SHAPE);
    board2.rotateRight();
    board2.moveLeft();
    fallToBottom(board2);

    board2.drop(Tetromino2.I_SHAPE);
    board2.rotateRight();
    board2.moveRight();
    fallToBottom(board2);

    board2.drop(Tetromino2.I_SHAPE);
    board2.rotateRight();
    board2.tick();
    board2.rotateLeft();
    
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateRight();
    fallLeft(board2);
    board2.rotateRight();
    
    expect(board2.toString()).to.equalShape(
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
    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateRight();
    fallLeft(board2);
    board2.rotateLeft();
    
    expect(board2.toString()).to.equalShape(
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

  test.skip("wallkick rotate right (R wall)", () => {
    board2.drop(Tetromino2.T_SHAPE);
    board2.rotateRight();
    fallRight(board2);
    board2.rotateRight();
    
    expect(board2.toString()).to.equalShape(
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
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });
});


