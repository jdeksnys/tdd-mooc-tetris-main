
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

describe("Moving falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("move left but no moving tetrominoes", () => {
    // beforeEach(() => {
    // });
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("move falling tetromino left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("move falling tetromino right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("move falling tetromino down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    fallLeft(board);
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    fallRight(board);
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved down beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      ....T.....
      ...TTT....`
    );
  });


  test("cannot be moved left onto another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallLeft(board);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    fallRight(board);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    fallLeft(board);
    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      .T..T.....
      TTTTTT....`
    );
  });


  test("cannot be moved right onto another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallRight(board);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    fallLeft(board);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    fallRight(board);
    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      .....T..T.
      ....TTTTTT`
    );
  });

  test("cannot be moved down onto another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ....T.....
      ...TTT....
      ....T.....
      ...TTT....`
    );
  });

  test.skip("cannot be moved down (rot-right-fit) onto another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveLeft();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...T......
       ...TT.....
       ...TT.....
       ...TTT....`
    );
  });

  test("cannot be moved down (rot-left-fit) onto another block", () => {
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


