export class RotatingShape{
    shape = [];
    rows = 0;
    cols = 0;
    
    constructor(str){
        let cols = 0;
        let row = [];
        for(let i=0; i<str.length; i++){
            if(str[i] == '\t' || str[i] == ' '){
                continue;
            }
            if(str[i] != '\n'){
                cols += 1;
              }
            if(i == str.length-1 || str[i] == '\n'){
                if(str[i] != '\n'){
                    row.push(str[i]);
                }
                this.cols = cols;
                this.rows += 1;
                this.shape.push(row);
                row = [];
                cols = 0;
                continue;
            }
            row.push(str[i]);
        }
    }
    
    static fromString(str) {
        return new RotatingShape(str);
    }
    
    toString() {
        let res = "";
        this.shape.forEach(row => {
            row.forEach(char => {res += char;});
            res += "\n";
        })
        return res;
    }

    rotateRight() {
        let res = "";
        for (let j=0; j<this.shape[0].length; j++) {
          let row = "";
          for (let i=this.shape.length-1; i>=0; i--) {
            row += this.shape[i][j];
          }
          res += row + "\n";
        }
        let arr = (new RotatingShape(res)).shape;
        arr = this.trimEdges(arr);
        return new RotatingShape(this.arrToString(arr));
    }


    trimEdges(arr){
        let R_null = arr.every(rec => rec[rec.length-1] == arr[0][rec.length-1]);
        let L_null = arr.every(rec => rec[0] == arr[0][0]);
        let U_null = arr[0].every(c => c==arr[0][0]);
        let B_null = arr[arr.length-1].every(c => c==arr[arr.length-1][0]);
        if((R_null && U_null && L_null) || (L_null && U_null && !R_null && !B_null)){
            const firstArr = arr.shift();
            arr.push(firstArr);
        } else if(U_null && L_null && B_null){
            arr.forEach(row => {
                let firsChar = row.shift();
                row.push(firsChar);
            })
        } else if(!L_null && !U_null && B_null && R_null){
            arr.forEach(row => {
                let lastChar = row.pop();
                row.unshift(lastChar);
            })
        }
        return arr;
    }

    arrToString(arr){
        let res = "";
        arr.forEach(row => {
          let rowStr = "";
          row.forEach(c => rowStr += c);
          res += rowStr + "\n";
        })
        return res;
    }
    
    rotateLeft() {
        let res = "";
        for (let j=this.shape[0].length-1; j>=0; j--) {
            let row = "";
            for (let i=0; i<this.shape.length; i++) {
              row += this.shape[i][j];
            }
            res += row + "\n";}
        let arr = (new RotatingShape(res)).shape;
        arr = this.trimEdges(arr);
        return new RotatingShape(this.arrToString(arr));
      }
  }