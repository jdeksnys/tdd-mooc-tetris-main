export class ScoringSystem {
    score;
    level;
    
    constructor(){
        this.tot_points = 0;
    }

    linesCleared(lines_cleared){
        if(lines_cleared == 1){
            this.score += 40;
        } else if(lines_cleared == 2){
            this.score += 100;
        } else if(lines_cleared == 3){
            this.score += 300;
        } else if(lines_cleared == 4){
            this.score += 1200;
        }
    }
}