export class Game{
    columns;
    rows;
    tickDuration;
    nextTick;
    scoring;
    board;
    tetrominoes;

    constructor(columns, rows, tickDuration, nextTick){
        this.columns = columns;
        this.rows = rows;
        this.tickDuration = tickDuration;
        this.nextTick = nextTick;
    }

    next_shape(){
        return this.tetrominoes[Math.floor(Math.random() * (this.tetrominoes.length-1))];
    }
}