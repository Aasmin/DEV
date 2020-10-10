// npm install --save-dev jstree
// npm install --save-dev jquery
const $ = require('jquery');
const fs = require("fs");
const { dir } = require("console");
require('jstree');  //jstree mein har file and folder ko node kehte hein. 
const path = require('path') //jstree ka module hai path
$(document).ready(function(){   //jquery ka function i.e agr document load hojae to function chla do
    //editor
    //terminal
    //tabs
    //tree view
    //pPath - poora path (C://...till file reached)
    let pPath = process.cwd();   //gives current working directory (gives Absolute path i.e from root)
    let name = path.basename(pPath);
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

    let data = [{
        id: pPath,
        parent: "#",
        text: name  //folder ka name
    }]
    let childArr = createData(pPath);   //we give parent's path to createData(), yeh sare children ka array ban ke de dega

    data = [...data, ...childArr];
    // MAJOR WORK: we are providing data to this.
    $("#tree").jstree({ //jstree make use of "tree" div to append the results to display on UI
        "core": {
            "data": data
        },
    })

})
function createData(parentPath) {
    let childrens = fs.readdirSync(parentPath); //parent folder ka content read kiya 
    let cdata = [];
    for (let i = 0; i < childrens.length; i++) {
        let cPath = path.join(parentPath, childrens[i]);   //joining parent's path with the children name
        let obj = {
            id: cPath,
            parent:parentPath,
            text: childrens[i]
        };
        cdata.push(obj);
    }
    return cdata;
} 
//WORKING of above - har node ke liye - { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" } - bnega
//  then create data call hoga sabhi ke liye
//     var data = [
//         { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
//         { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
//         { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
//         { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
//      ];
//     $("#tree").jstree({
//       "core" : {
//          "data": data
//       },     
//    })
// })

// function getName(path){
//     return nodePath.basename(path);
// }