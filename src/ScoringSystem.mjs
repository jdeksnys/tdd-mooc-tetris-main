export class ScoringSystem {
    tot_points;
    constructor(){
        this.tot_points = 0;
    }

    linesCleared(lines_cleared){
        if(lines_cleared == 1){
            this.tot_points += 40;
        } else if(lines_cleared == 2){
            this.tot_points += 100;
        } else if(lines_cleared == 3){
            this.tot_points += 300;
        } else if(lines_cleared == 4){
            this.tot_points += 1200;
        }
    }
}