// connect to ws server
const socket = io.connect("https://prac-whiteboard.herokuapp.com/");
// const socket = io.connect("http://localhost:3000");
console.log(socket);
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let sliders = document.querySelectorAll("input[type='range']");
let sticky = document.querySelector("#sticky");
let pencilSize = 5;
let eraserSize = 5;
// ctx.lineWidth=10;
let activeTool = "pencil";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.miterLimit = 1;
console.log(ctx);
pencil.addEventListener("click", function () {
    // ctx.strokeStyle = "black";
    if (activeTool == "pencil") {   //agar pencil already open thi, then show the options, else pencil ko on kro only and draw
        //  pencil options show
        pencilOptions.classList.add("show");
    } else {
        activeTool = "pencil";
        eraserOptions.classList.remove("show");
        ctx.strokeStyle = "black";
        ctx.lineWidth = pencilSize
        // socket.emit("color", "black");
    }
})
eraser.addEventListener("click", function () {
    // ctx.strokeStyle = "white";
    if (activeTool == "eraser") {
        //  pencil options show
        eraserOptions.classList.add("show");
    } else {
        activeTool = "eraser";
        pencilOptions.classList.remove("show");
        ctx.strokeStyle = "white";
        // socket.emit("message", "white");
        ctx.lineWidth = eraserSize;
        // socket.emit("color", "white");
    }
})
board.addEventListener("click", function(){
    pencilOptions.classList.remove("show");
    eraserOptions.classList.remove("show");
}) 
undo.addEventListener("click", function () {
    pencilOptions.classList.remove("show");
    eraserOptions.classList.remove("show");
    undoMaker()
})
redo.addEventListener("click", function () {
    pencilOptions.classList.remove("show");
    eraserOptions.classList.remove("show");
    redoMaker()
})
sticky.addEventListener("click", function () {
    pencilOptions.classList.remove("show");
    eraserOptions.classList.remove("show");
    createSticky();
})
// CTRL + Z = undo 
document.addEventListener("keydown", function (e) {
    var evtobj = e;
    if (evtobj.keyCode == 90 && evtobj.ctrlKey)
        undoMaker();
})

// CTRL + Y = redo 
document.addEventListener("keydown", function (e) {
    var evtobj = e;
    if (evtobj.keyCode == 89 && evtobj.ctrlKey)
        redoMaker();
})

function handleColor(color) {
    ctx.strokeStyle = color;
    socket.emit("color", color);
    pencilOptions.classList.remove("show");
    eraserOptions.classList.remove("show");
}

sliders.forEach(function (slider) {
    slider.addEventListener("change", function () {
        let value = slider.value;
        ctx.lineWidth = value;
        if (activeTool == "pencil") {
            pencilSize=ctx.lineWidth;
        } else{
            eraserSize=ctx.lineWidth;
        }
    })
})