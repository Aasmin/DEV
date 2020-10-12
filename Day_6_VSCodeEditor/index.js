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
    let data = [{   //making the root node
        id: pPath,
        parent: "#",
        text: name  //folder ka name
    }]
    let childArr = addCh(pPath);   //we give parent's path to addCh(), yeh sare children ka array ban ke de dega

    data = [...data, ...childArr];
    // MAJOR WORK: we are providing data to this.
    $("#tree").jstree({ //jstree make use of "tree" div to append the results to display on UI
        "core": {//core property mein data pass krdiya
            "check_callback" : true, //callback check krta if function fer te call karda
            "data": data
        },
    }).on("open_node.jstree", function (e, onClickData) {  //changed the select approach coz oh item de content nu khol reha c rather than ohde childs ikalle read krne
        console.log(onClickData);
        // let cNodePath = data.node.id; //jb click ho kisi node pe, uski id nikal lo
        // let cArr = createData(cNodePath); //node ke childs ka array bna lo
        // for (let i = 0; i < cArr.length; i++) {
        //     console.log(cArr[i]);
        //     $('#tree').jstree().create_node(cNodePath, cArr[i], "last");    //array ko jstree mein append krwado
        let children = onClickData.node.children;
        for (let i = 0; i < children.length; i++) {
            let gcArr = addCh(children[i]);
            for (let j = 0; j < gcArr.length; j++) {
                let doesExist = $('#tree').jstree(true).get_node(gcArr[j].id);
                if(doesExist){
                    return;
                }
                // create logic
                $("#tree").jstree().create_node(children[i], gcArr[j], "last"); //ethe jo child array bneya c oh parent nal append krke show krduga
                //jis krke arrow lagg jauga
        }
    }
})
})
 
function addCh(parentPath) {
    let isDir = fs.lstatSync(parentPath).isDirectory();     //check if its a folder 
    if (isDir == false) { //if its not a folder return empty
        return [];
    }
    //jo folders hein wo niche jayenge, aur unka content read hoga aur unke children ke object bnenge
    let childrens = fs.readdirSync(parentPath); //parent folder ka content read kiya 
    let cdata = [];
    for (let i = 0; i < childrens.length; i++) {
        let cPath = path.join(parentPath, childrens[i]);   //joining parent's path with the children name
        let obj = { //creation of the nodes
            id: cPath,
            parent:parentPath,
            text: childrens[i]
        };
        cdata.push(obj);
    }
    return cdata;
} 
//WORKING of above - In JsTree har node ke liye - { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" } - bnega
//  then create data call hoga sabhi ke liye    //jis cheez ka parent nahi wahan put '#'
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