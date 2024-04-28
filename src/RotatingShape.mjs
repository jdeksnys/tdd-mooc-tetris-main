
export class RotatingShape{
    shape = "";
    rows = 0;
    cols = 0;
    
    constructor(str){
        let cols = 0;
        for(let i=0; i<str.length; i++){
            if(str[i] != '\t' && str[i] != ' '){
                if(str[i] == '\n'){
                    this.cols = cols;
                    this.rows += 1;
                }
                this.shape += str[i];
                cols += 1;
            }
        }
    }
    
    static fromString(str) {
        return new RotatingShape(str);
    }
    
    toString = () => this.shape + "\n";
  }