import { RotatingShape } from "./RotatingShape.mjs";
import { RotatingShape2 } from "./RotatingShape2.mjs";

export class Tetromino2 {
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
    

    static I_SHAPE = new RotatingShape2([
        `....
         IIII
         ....
         ....`,
        `..I.
         ..I.
         ..I.
         ..I.`,
         `....
         IIII
         ....
         ....`,
        `..I.
         ..I.
         ..I.
         ..I.`]);
    
    static O_SHAPE = new RotatingShape2([
        `....
         .OO.
         .OO.
         ....`,
        `....
         .OO.
         .OO.
         ....`,
        `....
         .OO.
         .OO.
         ....`,
        `....
         .OO.
         .OO.
         ....`]);
}
