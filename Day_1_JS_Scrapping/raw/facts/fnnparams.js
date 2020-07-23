// function are variable 
// pass a variable as a parameter to a function
// pass a function as a parameter to function
function myfun(param) {
    let rVal = param();
    console.log(rVal);
}
// smallerFun is a callback function => a function that is passed to another function and could be called by it 
myfun(function smallerFun() {
    let a = 10; a++;    
    console.log("I am smaller func");
    return a;
}); 