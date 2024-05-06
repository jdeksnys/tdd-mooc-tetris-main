export class ScoringSystem {
    score;
    level;

    constructor(){
        this.tot_points = 0;
        this.level = 0;
    }

    linesCleared(lines_cleared){
        if(lines_cleared == 1){
            this.score += 40;
            this.level += 1;
        } else if(lines_cleared == 2){
            this.score += 100;
            this.level += 1;
        } else if(lines_cleared == 3){
            this.score += 300;
            this.level += 1;
        } else if(lines_cleared == 4){
            this.score += 1200;
            this.level += 1;
        }
    }
}