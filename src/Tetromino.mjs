import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino2 {
    static T_SHAPE = new RotatingShape([
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
    

    static I_SHAPE = new RotatingShape([
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
    
    static O_SHAPE = new RotatingShape([
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
