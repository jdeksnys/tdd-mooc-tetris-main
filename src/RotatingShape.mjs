export class RotatingShape {
  shape = [];
  rows = 0;
  cols = 0;

  constructor(str) {
    let cols = 0;
    let row = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] == "\t" || str[i] == " ") {
        continue;
      }
      if (i == str.length - 1 || str[i] == "\n") {
        if (str[i] != "\n") {
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
      cols += 1;
    }
  }

  static fromString(str) {
    return new RotatingShape(str);
  }

  toString() {
    let res = "";
    this.shape.forEach((row) => {
      row.forEach((char) => {
        res += char;
      });
      res += "\n";
    });
    return res;
  }
}
