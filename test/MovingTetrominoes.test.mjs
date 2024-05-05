
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

describe("Moving falling tetrominoes", () => {
  let board;
  let board2;
  beforeEach(() => {
    board = new Board(10, 6);
    board2 = new Board2(10, 6);
  });

  test.skip("move left but no moving tetrominoes", () => {
    board2.moveLeft();
    expect(board2.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("move falling tetromino left", () => {
    board2.drop(Tetromino2.T_SHAPE);
    board2.moveLeft();
    
    expect(board2.toString()).to.equalShape(
      `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("move falling tetromino right", () => {
    board2.drop(Tetromino2.T_SHAPE);
    board2.moveRight();

    expect(board2.toString()).to.equalShape(
      `....TTT...
       .....T....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("move falling tetromino down", () => {
    board2.drop(Tetromino2.T_SHAPE);
    board2.moveDown();

    expect(board2.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved left beyond the board", () => {
    board2.drop(Tetromino2.T_SHAPE);
    fallLeft(board2);
    board2.moveLeft();
    expect(board2.toString()).to.equalShape(
      `TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved right beyond the board", () => {
    board2.drop(Tetromino2.T_SHAPE);
    fallRight(board2);
    board2.moveRight();
    expect(board2.toString()).to.equalShape(
      `.......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved down beyond the board", () => {
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);
    board2.moveDown();
    expect(board2.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      ...TTT....
      ....T.....`
    );
  });


  test("cannot be moved left onto another block", () => {
    board2.drop(Tetromino2.T_SHAPE);
    fallLeft(board2);
    fallToBottom(board2);

    board2.drop(Tetromino2.T_SHAPE);
    fallRight(board2);
    board2.tick();
    board2.tick();
    board2.tick();
    board2.tick();
    fallLeft(board2);

    expect(board2.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      TTTTTT....
      .T..T.....`
    );
  });


  test("cannot be moved right onto another block", () => {
    board2.drop(Tetromino2.T_SHAPE);
    fallRight(board2);
    fallToBottom(board2);

    board2.drop(Tetromino2.T_SHAPE);
    fallLeft(board2);
    board2.tick();
    board2.tick();
    board2.tick();
    board2.tick();
    fallRight(board2);
    expect(board2.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      ....TTTTTT
      .....T..T.`
    );
  });

  test("cannot be moved down onto another block", () => {
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);

    expect(board2.toString()).to.equalShape(
      `..........
      ..........
      ...TTT....
      ....T.....
      ...TTT....
      ....T.....`
    );
  });

  test("cannot be moved down (rot-left-fit) onto another block", () => {
    board2.drop(Tetromino2.T_SHAPE);
    board2.tick();
    board2.rotateRight();
    board2.rotateRight();
    fallToBottom(board2);

    board2.drop(Tetromino2.T_SHAPE);
    board2.tick();
    board2.rotateLeft();
    board2.moveLeft();
    fallToBottom(board2);

    expect(board2.toString()).to.equalShape(
      `..........
       ..........
       ...T......
       ...TT.....
       ...TT.....
       ...TTT....`
    );
  });

  test("cannot be moved down (rot-right-fit) onto another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.moveRight();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .....T....
       ....TT....
       ....TT....
       ...TTT....`
    );
  });
});


