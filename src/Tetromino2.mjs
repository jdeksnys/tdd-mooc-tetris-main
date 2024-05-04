import { RotatingShape } from "../src/RotatingShape.mjs";
import { RotatingShape2 } from "./RotatingShape2.mjs";

export class Tetromino2 {
    static T_SHAPE_old = new RotatingShape2([
    ]);

    static T_SHAPE = new RotatingShape2([
        `....
         TTT.
         .T..
         ....`,
        `.T..
         TT..
         .T..
         ....`,
        `....
         .T..
         TTT.
         ....`,
        `.T..
         .TT.
         .T..
         ....`]);
    

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
}