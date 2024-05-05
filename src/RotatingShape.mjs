export class RotatingShape{
    shapes = [];
    rows = 0;
    cols = 0;
    
    static stringToArray(str){
        let cols = 0;
        let row = [];
        let res = [];
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
                res.push(row);
                row = [];
                cols = 0;
                continue;
            }
            row.push(str[i]);
        }
        return res;
    }

    constructor(shape_strings, i=0){
        this.i = i;
        this.shapes = []
        shape_strings.forEach(rec => {
          if(!Array.isArray(rec)){
            rec = RotatingShape.stringToArray(rec);
          }
            this.shapes.push(rec);
        });
    }
    
    static fromString(str) {
        let str0 = str;
        let str1 = RotatingShape.rotateRight_str(str0);
        let str2 = RotatingShape.rotateRight_str(str1);
        let str3 = RotatingShape.rotateRight_str(str2);
        return new RotatingShape([str0, str1, str2, str3]);
    }
    
    toString() {
        let res = "";
        this.shapes[this.i].forEach(row => {
            row.forEach(char => {res += char;});
            res += "\n";
        })
        return res;
    }

    static rotateRight_str(shape_str) {
        let res = "";
        let shape = RotatingShape.stringToArray(shape_str);
        for (let j=0; j<shape[0].length; j++) {
          let row = "";
          for (let i=shape.length-1; i>=0; i--) {
            row += shape[i][j];
          }
          res += row + "\n";
        }
        return res;
    }

    rotateRight() {
        let i = this.i + 1;
        if(i > 3){
            i = 0;
        }
        return new RotatingShape(this.shapes, i);
    }

    rotateLeft() {
        this.i -= 1;
        let i = this.i - 1;
        if(i < 0){
            i = 3;
        }
        return new RotatingShape(this.shapes, i);
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
    
    static rotateLeft_str(shape_str) {
        let res = "";
        let shape = this.stringToArray(shape_str);
        for (let j=shape[0].length-1; j>=0; j--) {
            let row = "";
            for (let i=0; i<shape.length; i++) {
              row += shape[i][j];
            }
            res += row + "\n";}
        return res;
      }
  }