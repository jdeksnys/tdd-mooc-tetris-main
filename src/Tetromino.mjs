import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
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
        
         static L_SHAPE = new RotatingShape([
            `....
             LLL.
             L...
             ....`,
             `LL..
             .L..
             .L..
             ....`,
             `....
             ..L.
             LLL.
             ....`,
             `.L..
              .L..
              .LL.
              ....`
            ]);

    static J_SHAPE = new RotatingShape([
        `....
         JJJ.
         ..J.
         ....`,
        `.J..
         .J..
         JJ..
         ....`,
         `....
          J...
          JJJ.
          ....`,
         `.JJ.
          .J..
          .J..
          ....`
        ]);

    static S_SHAPE = new RotatingShape([
        `....
         .SS.
         SS..
         ....`,
        `S...
         SS..
         .S..
         ....`,
        `....
         .SS.
         SS..
         ....`,
        `S...
         SS..
         .S..
         ....`,
    ]);

    static Z_SHAPE = new RotatingShape([
        `....
         ZZ..
         .ZZ.
         ....`,
        `..Z.
         .ZZ.
         .Z..
         ....`,
        `....
         ZZ..
         .ZZ.
         ....`,
        `..Z.
         .ZZ.
         .Z..
         ....`
    ]);
}
