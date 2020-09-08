let fs = require("fs")
async function fn() {
    let ffp = fs.promises.readFile("f1.txt");
    let sfp = fs.promises.readFile("f2.txt");
    let dArr = await Promise.all([ffp, sfp]);
    console.log(dArr[0] + " ");
    console.log(dArr[1] + " ");
}
fn();
