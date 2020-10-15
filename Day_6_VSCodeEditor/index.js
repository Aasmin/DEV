// npm install --save-dev jstree
// npm install --save-dev jquery
// npm install monaco-editor
// npm install -g node-gyp
const $ = require('jquery');
const fs = require("fs");
const { dir } = require("console");
let myMonaco, editor;
require('jstree');  //jstree mein har file and folder ko node kehte hein. 
let tabArr = {};
const path = require('path') //jstree ka module hai path
$(document).ready(async function(){   //jquery ka function i.e agr document load hojae to function chla do
    //editor
    editor = await createEditor();  //added promise
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
            "data": data,
            "themes": {
                "icons": false
            }
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
}).on("select_node.jstree", function (e, dataObj) {
    let fPath = dataObj.node.id;
    let isFile = fs.lstatSync(fPath).isFile(); //chck file hai ke nhi
    //set Data
    if (isFile){ 
        setData(fPath); //show data on UI
        createTab(fPath);    
    }
    });
    // Terminal
    const os = require('os');
    const pty = require('node-pty');
    const Terminal = require('xterm').Terminal;

    // Initialize node-pty with an appropriate shell
    const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: process.env
    });

    let { FitAddon } = require('xterm-addon-fit');
    const xterm = new Terminal();
    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);
    xterm.setOption('theme', {background: 'rebeccapurple'});
    // Initialize xterm.js and attach it to the DOM
    xterm.open(document.getElementById('terminal'));

    // Setup communication between xterm.js and node-pty
    xterm.onData(function(data) {ptyProcess.write(data)});  //input (Xterm se data will be written to pty and then sent to terminal)
    ptyProcess.on('data', function (data) { 
        xterm.write(data);    // after processing terminal sends back data to xterm
    });
    fitAddon.fit(); //parent ke height and width ko match
    myMonaco.editor.defineTheme('dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [{ background: '#1e2024' }],
        "colors": {
            "editor.foreground": "#F8F8F8",
            "editor.background": "#1e2024",
            "editor.selectionBackground": "#DDF0FF33",
            "editor.lineHighlightBackground": "#FFFFFF08",
            "editorCursor.foreground": "#A7A7A7",
            "editorWhitespace.foreground": "#FFFFFF40"
        }
    });
    myMonaco.editor.defineTheme('light', {
        "base": "vs",
        "inherit": true,
        rules: [{ background: '#1e2024' }],
        "colors": {
            "editor.foreground": "#3B3B3B",
            "editor.background": "#FFFFFF",
            "editor.selectionBackground": "#BAD6FD",
            "editor.lineHighlightBackground": "#00000012",
            "editorCursor.foreground": "#000000",
            "editorWhitespace.foreground": "#BFBFBF"
        }
    });
    let isDark = false;
    $("#toggle").on("click", function(){
        if(isDark){
            myMonaco.editor.setTheme('light');
        }else{
            myMonaco.editor.setTheme('dark');
        }
        isDark = !isDark;
    })
    $(".file-explorer").resizeable();
    setTimeout(function () {
        myMonaco.editor.setTheme('myTheme');
    },10000);
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

function createEditor() {
     //https://github.com/microsoft/monaco-editor-samples/blob/master/electron-amd-nodeIntegration/electron-index.html
     const amdLoader = require('./node_modules/monaco-editor/min/vs/loader.js');
     const amdRequire = amdLoader.require;
     const amdDefine = amdLoader.require.define;
 
     amdRequire.config({
         baseUrl: './node_modules/monaco-editor/min'
     });
 
     // workaround monaco-css not understanding the environment
     self.module = undefined;
     return new Promise(function (resolve, reject){
         amdRequire(['vs/editor/editor.main'], function () {
             var editor = monaco.editor.create(document.getElementById('editor'), {
                 value: [
                     'function x() {',
                     '\tconsole.log("Hello world!");',
                     '}'
                    ].join('\n'),
                    language: 'javascript',
                    automaticLayout: true
                });
                myMonaco = monaco;  //saving the refernce so that to use it globally (hor functions che use karn lai)
                resolve(editor);
            });
        })
}
function setData(fPath) {
    let content = fs.readFileSync(fPath,"utf-8"); //buffer to text
        // console.log(content);
        editor.getModel().setValue(content); 
        //Observed: Error arhe the for all lang other than JS. Therefore, find the extension and send that to model
        var model = editor.getModel(); 
        let ext = fPath.split(".").pop(); //ext: language to be used
        if (ext == "js") {
            ext = "javascript";
        }
        myMonaco.editor.setModelLanguage(model, ext);   
}
function createTab(fPath) {
    let fName = path.basename(fPath);
    if (!tabArr[fPath]) {   //For icon Used: https://fontawesome.com/icons?d=gallery&q=close
        $("#tabs-row").append(`<div class="tab">
        <div class="tab-name" id=${fPath} onclick=handleTab(this)>${fName}</div>
        <i class="fas fa-times" id=${fPath} onclick=handleClose(this)></i>
        </div>`);
        tabArr[fPath] = fName;
    }
}
function handleTab(elem) {  // mirror the file explorer click to open up the file if clicked on tab already opened
    let fPath = $(elem).attr("id");
    setData(fPath);
}
function handleClose(elem) {
    let fPath = $(elem).attr("id");
    delete tabArr[fPath];
    $(elem).parent().remove();  //parent == tab (line 130)
    fPath =$(".tab .tab-name").eq(0).attr("id");    // find first tab
    if(fPath){
        setData(fPath);
    }
}