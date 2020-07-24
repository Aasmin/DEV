// npm install request
// to make a request to any server
let request = require("request");   
let fs = require("fs"); //file system module
let cheerio = require("cheerio");
let eachMatchHandler = require("./match");

request("https://www.espncricinfo.com/series/_/id/8039/season/2015/icc-cricket-world-cup", dataReciever);
function dataReciever(err, res, html) {
    if(err == null && res.statusCode == 200)
        parsefile(html);
        // console.log(html);
    else if(res.statusCode == 404)
        console.log("Page not found");
    else {
        console.log(err + "\n" + res);
    }
}

function parsefile(html) {  // get url of all matches page
    let $ = cheerio.load(html);
    // let list = $("ul.list-unstyled.mb-0");
    // fs.writeFileSync("list.html",list);

    let a = $("li.widget-items.cta-link a").attr("href");
    // console.log(a); //prints the link
    let fulllink = "https://www.espncricinfo.com/" + a;
    // console.log(fulllink); //prints the full link
    request(fulllink, matchPageHandler);    // get html of all matches page
}

function matchPageHandler(err, res, html) {
    if(err == null && res.statusCode == 200) {
        parseMatch(html);
    } else if (res.statusCode == 404)
        console.log("Page not found.");
    else    
        console.log(err + "\n" + res);
}

// get link of all the matches
function parseMatch(html) {
    let $ = cheerio.load(html);
    let allCards = $(".col-md-8.col-16");

    // console.log(allCards.length);
    // fs.writeFileSync("allCards.html", allCards);
    for(let i = 0; i < allCards.length; i++) {
        // find => find in element 
        // let result = $(allCards[i]).find(".extra-small.mb-0.match-description.match-description-bottom").text();
        // let details = $(allCards[i]).find(".small.mb-0.match-description").text();
        let allanchors = $(allCards[i]).find(".match-cta-container a")
        let scoreCardLink = $(allanchors[0]).attr("href");
        // console.log(result);
        // console.log(details);
        // console.log("https://www.espncricinfo.com" + scoreCardLink);
        eachMatchHandler("https://www.espncricinfo.com" + scoreCardLink);   // use => match.js file=> pass url
    }
}
