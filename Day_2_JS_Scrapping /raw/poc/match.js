let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
console.log("Request send");

function eachMatchHandler(url) {
    request(url, dataReciever);
}
function dataReciever(err, res, html) {
    if (err == null && res.statusCode == 200) {
        //  console.log(res);
        // console.log(html);
        parseHtml(html);
    } else if (res.statusCode == 404) {
        console.log("Page Not found");
    } else {
        console.log(err);
        console.log(res);
    }
}

function parseHtml(html) {
    let $ = cheerio.load(html);

    let bothInnings = $(".match-scorecard-page div .card.content-block.match-scorecard-table");
    for (let inn = 0; inn < bothInnings.length; inn++) {
        let rows = $(bothInnings[inn]).find("table.table.batsman tbody tr");
        let teamName = $(bothInnings[inn]).find("h5").text();   //  New Zealand Innings (50 overs maximum)
        teamName = teamName.split("Innings")[0].trim();
        // filter rows that doen't contain batsman cell
        for (let i = 0; i < rows.length; i++) {
            let colsInEveryRow = $(rows[i]).find("td");
            // has class to check if an element contains the class or not
            let isPlayer = $(colsInEveryRow[0]).hasClass("batsman-cell");
            if (isPlayer == true) {
                let pName = $(colsInEveryRow[0]).text().replace("(c)", "");
                pName = pName.trim();
                let runs = $(colsInEveryRow[2]).text();
                let balls = $(colsInEveryRow[3]).text();
                console.log(`${pName} of ${teamName} scored ${runs} in ${balls} balls`);
                // handlePlayer(pName, teamName, runs, balls);
                // directory => team 
                // file => player
            }
        }
        console.log("``````````````````````````");
    }
    console.log("############################")
    // console.log("Data Recieved");
    // fs.writeFileSync("batsManTable.html", tables);
    // console.log("File written to disk");
    // .match-scorecard-page div .card.content-block.match-scorecard-table
}

// export inorder to use it in another file
module.exports = eachMatchHandler;
