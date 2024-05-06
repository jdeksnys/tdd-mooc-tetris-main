export class Game{
    columns;
    rows;
    tickDuration;
    nextTick;
    scoring;
    board;
    tetrominoes;
    level;
    score;

    constructor(columns, rows, tickDuration, nextTick){
        this.columns = columns;
        this.rows = rows;
        this.tickDuration = tickDuration;
        this.nextTick = nextTick;
        this.level = 0;
        this.score = 0;
    }

    next_shape(){
        return this.tetrominoes[Math.floor(Math.random() * (this.tetrominoes.length-1))];
    }
}