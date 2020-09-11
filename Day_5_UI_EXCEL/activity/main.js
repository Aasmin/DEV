const electron = require("electron");
const app = electron.app;

//Biolerplate code - baar baar use howega eh code
function createWindow() {
    new electron.BrowserWindow({
        width:800,
        height:600
    })
}
app.whenReady().then(createWindow);