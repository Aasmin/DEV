// function outer (base) {
//     console.log(base)
//     function inner (exp) {
//         console.log(Math.pow(base, exp));
//     }
//     return inner;
// }

// var inr = outer(10)
// var a = inr(2)
// console.log(a);

function getFirstName (firstName) {
    return function getLastName(lastName) {
        console.log(`${firstName} ${lastName}`);
    }
}

let rf = getFirstName("Justin");
console.log("Other Work");
setTimeout(function (){
    rf("Trudeau");
}, 1000)