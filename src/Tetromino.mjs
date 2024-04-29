import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {
    constructor(shape){
        this.shape = shape;
    }
    static T_SHAPE = new RotatingShape(
        `.T.
         TTT
         ...`
    );

    static I_SHAPE = new RotatingShape(
        `.....
         .....
         IIII.
         .....
         .....`
    );
    
    static O_SHAPE = new RotatingShape(
        `.OO
        .OO
        ...`
    );
}