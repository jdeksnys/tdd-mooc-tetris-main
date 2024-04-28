import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {
    constructor(shape){
        this.shape = shape;
    }
    static T_SHAPE = new RotatingShape(".T.\nTTT\n...");
}