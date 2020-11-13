// cd into activity
// npm init -y
//npm install electron --save-dev
// npm install electron-packager --save-dev
// modify package.json
// npm run package-mac : Folder ban jauga release-builds de naam da, then go inside the folder and Go to folder view in version.
//There you will find the application .exe file 

const electron =require("electron");
const { app,BrowserWindow } = require("electron");

async function createWindow(){
    const win=new BrowserWindow({
        // provides node to electron app
        webPreferences:{
            nodeIntegration:true
        }
    })

    await win.loadFile("index.html");
    win.maximize();
    // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
