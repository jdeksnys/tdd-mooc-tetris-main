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
        let test = Math.floor(Math.random() * this.tetrominoes.length);
        return this.tetrominoes[test];
    }
}