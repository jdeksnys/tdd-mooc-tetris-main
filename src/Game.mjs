export class Game{
    columns;
    rows;
    tickDuration;
    nextTick;
    scoring;
    board;

    constructor(columns, rows, tickDuration, nextTick){
        this.columns = columns;
        this.rows = rows;
        this.tickDuration = tickDuration;
        this.nextTick = nextTick;
    }
}