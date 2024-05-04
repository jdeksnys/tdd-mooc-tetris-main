import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino2 {
    static T_SHAPE = new Tetromino2Inner([
        new RotatingShape(`....
                           TTT.
                           .T..
                           ....`),
        new RotatingShape(`.T..
                           TT..
                           .T..
                           ....`),
        new RotatingShape(`....
                           .T..
                           TTT.
                           ....`),
        new RotatingShape(`.T..
                           .TT.
                           .T..
                           ....`)
    ]);
    

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

class Tetromino2Inner{
    i;
    shapes;
    constructor(shapes){
        this.i = 0;
        this.shapes = shapes;
    }
}