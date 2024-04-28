
export class RotatingShape{
    shape;
    constructor(str){
        if(str){this.shape = str;}
    }
    static fromString(str) {
        return new RotatingShape(str);
    }
    static toString = () => this.shape;
  }