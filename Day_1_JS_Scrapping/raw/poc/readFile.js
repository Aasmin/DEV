let fs = require("fs");

// buffer format read
// let buffer = fs.readFileSync("../facts/index.html");
// console.log(buffer);

let cheerio = require("cheerio");
let html = fs.readFileSync("../facts/index.html", "utf-8");
// console.log(typeof html);
// console.log(html);

let $ = cheerio.load(html);
// let h1 = $("h1");   //to select h1 element from the page
// let h1KaData = h1.text();
// console.log(h1KaData);

// let a = $("a"); //for multiple elements, returns the array
// let aKaData = a.text();
// console.log(aKaData);

// let ulKaP = $("ul p");  //to select the elem inide of another elem
// console.log(ulKaP.text());

// let classElem = $(".para");
// console.log(classElem.text());

// let classElem = $(".para.first-para");  //selecting elem with two classes
// console.log(classElem.text());

let classElem = $("#unique");   //selecting elem with id
console.log(classElem.text());
