let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let sliders = document.querySelectorAll("input[type='range']");
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
    }
}) 
undo.addEventListener("click", function () {
    undoMaker()
})
redo.addEventListener("click", function () {
    redoMaker()
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
}

sliders.forEach(function (slider) {
    slider.addEventListener("change", function () {
        let value = slider.value;
        ctx.lineWidth = value;
    })
})