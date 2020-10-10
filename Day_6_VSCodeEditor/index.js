// npm install --save-dev jstree
// npm install --save-dev jquery
const $ = require('jquery');
require('jstree');  //jstree mein har file and folder ko node kehte hein. 
const nodePath = require('path') //jstree ka module hai path
$(document).ready(function(){   //jquery ka function i.e agr document load hojae to function chla do
    //editor
    //terminal
    //tabs
    //tree view
    let currPath = process.cwd();   //gives current working directory (gives Absolute path i.e from root)
    let dirName = nodePath.basename(currPath);
    // console.log(currPath);
    // console.log(getName(currPath));
    // let data = [];
    // let baseobj = { //creation of the base node
    //     id : currPath,
    //     parent : "#",   //jis cheez ka parent nahi wahan put '#'
    //     text : getName(currPath)
    // };
    // data.push(baseobj);

    // $('#file-explorer').jstree({
    //     "core" : {  //core property mein data pass krdiya
    //          "data": data
    //       }
    // })
    var data = [
        { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
        { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
        { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
        { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
     ];
    $("#tree").jstree({
      "core" : {
         "data": data
      },     
   })
})

// function getName(path){
//     return nodePath.basename(path);
// }