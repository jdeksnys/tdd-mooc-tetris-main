import { RotatingShape } from "../src/RotatingShape.mjs";
export class Tetromino {
    constructor(shape){
        this.shape = shape;
    }
    static T_SHAPE = new RotatingShape("XXX\n.X.\n.X.");
    rotateRight() {
        return new Tetromino(this.rotatingShape.rotateRight());
    }
}