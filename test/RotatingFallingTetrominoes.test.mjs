
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
    board = new Board(10, 6);
  });

  test("rotate left but no moving tetrominoes", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
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
       ..........`
    );
  });

  test.skip("rotate right after drop", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ..........
         ..........
         ..........`
    );
  });

  test.skip("rotate left after drop", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
        `....T.....
         ...TT.....
         ....T.....
         ..........
         ..........
         ..........`
    );
  });

  test.skip("rotate left after drop+tick", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
        `..........
        ..........
         ....T.....
         ...TT.....
         ....T.....
         ..........`
    );
  });

  test.skip("rotate right after drop+tick", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
        `..........
        ..........
         ....T.....
         ....TT....
         ....T.....
         ..........`
    );
  });
});


