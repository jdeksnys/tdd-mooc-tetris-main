
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Board2 } from "../src/Board2.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { Tetromino2 } from "../src/Tetromino2.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  let board2;
  beforeEach(() => {
    board = new Board(10, 6);
    board2 = new Board2(10, 6);
  });

  test("start from the top middle", () => {
    board2.drop(Tetromino2.T_SHAPE);

    expect(board2.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("stop when they hit the bottom", () => {
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);

    expect(board2.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  test("stop when they land on another block", () => {
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
});

