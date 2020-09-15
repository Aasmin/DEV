/**
 * Event driven Programming
 * will use JQuery. npm install jquery
 * Text Container -> Cell Click -> Address visibility
*/
const $ = require('jquery');
$(document).ready(function() {
    // console.log("JQuery Loaded");
    $("#grid .cell").on("click", function() {
        let colId = $(this).attr("c-id");
        let rowId = $(this).attr("r-id");
        console.log(colId + " " + rowId);
    })
})