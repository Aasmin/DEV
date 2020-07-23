function getFirstName(fullName) {
    return fullName.split(" ")[0];
}

function getLastName(fullName) {
    return fullName.split(" ")[1];
}


// hof => that accepts a function and calls it internally
function greeter(fullName, cb) {
    let message = cb(fullName);
    console.log(message);
}

greeter("Aasminpreet Singh", getFirstName);
greeter("Aasminpreet Singh", getLastName);