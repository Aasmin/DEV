console.log("First Line :)");
console.log("Second Line :)");
let varName;    //variale declaration
//dynamically typed language
varName = 10;
varName = "abc";
console.log(varName);

let number = 13
for(let i = 2; i * i <= number; i++) {
    if(number % i == 0) {
        console.log("Number not prime");
        return;
    }
}
console.log("Number prime");