socket.on("colorchange", function (color) {
    ctx.strokeStyle = color;
});
socket.on("onmd", function (point) {
    console.log(point);
    let { color, width, x, y } = point;
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    points.push(point)
});
socket.on("onmm", function (point) {
    let { color, width, x, y } = point;
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
    points.push(point)
});
socket.on("undo", function (){
    if (points.length >= 2) {
        // pop last line
        let tempArr = [];
        for (let i = points.length - 1; i >= 0; i--) {
            let { id } = points[i];
            if (id == "md") {
                tempArr.unshift(points.pop());
                break;
            } else {
                //  mm
                tempArr.unshift(points.pop());
            }
        }
        //  clear Rect
        ctx.clearRect(0, 0, board.width, board.height);
        // call redraw
        redoArr.push(tempArr);
        redraw();
    }
});
socket.on("redo", function(){
    if (redoArr.length > 0) {
        let mrPathArr = redoArr.pop();
        //  add all points to undo arr
        points.push(...mrPathArr);
        ctx.clearRect(0, 0, board.width, board.height);
        // call redraw
        redraw();
    }
}) 