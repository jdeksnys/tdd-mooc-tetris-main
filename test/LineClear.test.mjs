
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
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

  test("last line to clear", () => {
    board2.drop(Tetromino2.I_SHAPE);
    board2.moveRight();
    fallToBottom(board2);

    board2.drop(Tetromino2.I_SHAPE);
    fallLeft(board2);
    fallToBottom(board2);

    board2.drop(Tetromino2.O_SHAPE);
    fallRight(board2);
    fallToBottom(board2);
    
    expect(board2.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ........OO`
    );
  });

  test("middle line to clear", () => {
    board2.drop(Tetromino2.O_SHAPE);
    fallLeft(board2);
    fallToBottom(board2);
    
    board2.drop(Tetromino2.O_SHAPE);
    fallToBottom(board2);
    
    board2.drop(Tetromino2.O_SHAPE);
    fallRight(board2);
    fallToBottom(board2);
    
    board2.drop(Tetromino2.I_SHAPE);
    fallLeft(board2);
    fallToBottom(board2);
    
    board2.drop(Tetromino2.I_SHAPE);
    board2.moveRight();
    fallToBottom(board2);
    
    board2.drop(Tetromino2.O_SHAPE);
    fallRight(board2);
    fallToBottom(board2);
    
    expect(board2.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ........OO
       OO..OO..OO
       OO..OO..OO`
    );
  });
});