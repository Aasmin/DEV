"resolve/reject" di jgah added try catch block. "then" di jgah added await.
 Install Puppeteer - npm install puppeteer

 * waitForNavigation - WAITS (puppeteer: 22)
    * FOR STATIC SITES (i.e jina kol front end framework use ni krti)
        * Load => html, css, js files are loaded
        * DOM content Loaded => html file loaded
    * Frontend Framework Site (React, Angular, Vue)
        * Networkidle0 => browser network is idle for 500 ms
        * Networkidle2 => browser network 500 ms not more 2 request (For real-time application sites like fb, pubg: jo sockets use krti hein and who didn't stop requesting data)