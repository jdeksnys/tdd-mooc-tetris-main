
export class RotatingShape{
    shape = "";
    
    constructor(str){
        for(let i=0; i<str.length; i++){
            if(str[i] != '\t' && str[i] != ' '){
                this.shape += str[i];
            }
        }
    }
    
    static fromString(str) {
        return new RotatingShape(str);
    }
    
    toString = () => this.shape + "\n";
  }