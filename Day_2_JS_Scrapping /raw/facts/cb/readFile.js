let fs = require("fs");
console.log("Before");
// sync -> fn
// stuck 
let content = fs.readFileSync("file.mp4");
console.log("content" + content.byteLength);
console.log("After");