let ispendown = false;
board.addEventListener("mousedown", function (e) {
    // path start
    let x = e.clientX;
    let y = e.clientY;
    let top= getPosition(); 
    y = y - top;
    //  move to
    ctx.moveTo(x, y);
    ispendown = true;
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