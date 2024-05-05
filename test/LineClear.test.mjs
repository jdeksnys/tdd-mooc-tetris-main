
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board2 } from "../src/Board2.mjs";
import { Tetromino2 } from "../src/Tetromino2.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board2
  beforeEach(() => {
    board2 = new Board2(10, 6);
  });

  test("no lines to clear", () => {
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);
    board2.drop(Tetromino2.T_SHAPE);
    fallToBottom(board2);
    expect(board2.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });

});
