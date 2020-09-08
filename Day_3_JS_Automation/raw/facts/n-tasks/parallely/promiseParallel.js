let files = ["../f1.txt", "../f2.txt", "../f3.txt"];
let fs = require("fs");
for(let i = 0; i < files.length; i++) {
    let fpReadPromise = fs.promises.readFile(files[i]);
    fpReadPromise.then(function (data){
        console.log(data + " ");
    }) 
}
