//import nodeJS
let fs = require("fs");

let content = fs.readFileSync("f1.txt");
console.log("content of f1 " + content);