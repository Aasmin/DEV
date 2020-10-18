let ispendown = false;
let points = [];
board.addEventListener("mousedown", function (e) {
    // path start
    let x = e.clientX;
    let y = e.clientY;
    let top= getPosition(); 
    y = y - top;
    //  move to
    ctx.beginPath(0, 0);
    ctx.moveTo(x, y);
    ispendown = true;

    let mdp = {
        x: x,
        y: y,
        id: "md",
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }
    points.push(mdp);
})
board.addEventListener("mousemove", function (e) {
    //  lineto 
    let x = e.clientX;
    let y = e.clientY;
    let top= getPosition();
    y = y - top;
    if (ispendown == true) {
        ctx.lineTo(x, y);
        ctx.stroke();

        let mmp = {
            x: x,
            y: y,
            id: "mm",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        points.push(mmp);
    }
    // repeat
})

window.addEventListener("mouseup", function (e) {//this is window event as jad bahr chale jande c then aape draw krda rehnda c
    // mouse up
    ispendown = false;

}) 

function getPosition() {
    let { top } = board.getBoundingClientRect();    // shorthand declaration: https://stackoverflow.com/questions/15290981/what-does-curly-brackets-in-the-var-statements-do
    return top;
} 

function redraw() {
    for (let i = 0; i < points.length; i++) {
        let { x, y, id, color, width } = points[i];
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if (id == "md") {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else if (id == "mm") {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}

function undoMaker() {
    // addFirst => unshift, 
    // removeFirst => shift
    //  addLast=> push
    // removeLast => pop
    if (points.length >= 2) {
        // pop last line
        for (let i = points.length - 1; i >= 0; i--) {
            let { id } = points[i];
            if (id == "md") {
                points.pop();
                break;
            }else{
//  mm
                points.pop();
            }
        }
        //  clear Rect
        ctx.clearRect(0, 0, board.width, board.height);
        // call redraw
        redraw();
    }

}