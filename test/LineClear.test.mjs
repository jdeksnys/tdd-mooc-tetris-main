
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

describe("Falling tetrominoes", () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("no lines to clear", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });

  test("last line to clear", () => {
    board.drop(Tetromino.I_SHAPE);
    board.moveRight();
    fallToBottom(board);

    board.drop(Tetromino.I_SHAPE);
    fallLeft(board);
    fallToBottom(board);

    board.drop(Tetromino.O_SHAPE);
    fallRight(board);
    fallToBottom(board);
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ........OO`
    );
  });

  test("middle line to clear", () => {
    board.drop(Tetromino.O_SHAPE);
    fallLeft(board);
    fallToBottom(board);
    
    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);
    
    board.drop(Tetromino.O_SHAPE);
    fallRight(board);
    fallToBottom(board);
    
    board.drop(Tetromino.I_SHAPE);
    fallLeft(board);
    fallToBottom(board);
    
    board.drop(Tetromino.I_SHAPE);
    board.moveRight();
    fallToBottom(board);
    
    board.drop(Tetromino.O_SHAPE);
    fallRight(board);
    fallToBottom(board);
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ........OO
       OO..OO..OO
       OO..OO..OO`
    );
  });
});