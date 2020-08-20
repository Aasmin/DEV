//Hackerrank links fetcher

// npm install selenium-webdriver
//npm install chromedriver
require("chromedriver");    //store karn di jroort nahi hai as swd apne aap call kr lega
let swd = require("selenium-webdriver");    
// build browser
let bldr = new swd.Builder();   //Builder naam ki class ka ek object ban rha
// build a tab
let driver = bldr.forBrowser("chrome").build(); //driver represents a tab -- i.e jo bhi kaam tab ke andr krna hai wo sab driver pe hoga
// pending 
// let GWillBeOpendP = driver.get("https://www.google.com/");
let GWillBeOpendP = driver.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");

// GWillBeOpendP.then(function () {
//     // console.log("Home page opened");
//     let emailPromise = driver.findElement(swd.By.css("#input-1"));

//     emailPromise.then(function (emailElement) {
//         let EWillBeEP = emailElement.sendKeys("hsdfvamsdjhf");

//         EWillBeEP.then(function () {
//             console.log("Data entered");
//         })
//     })
// });
// GWillBeOpendP.catch(function(err) {
//     console.log(err);
// });

let { email, pwd } = require("../../../credentials");
GWillBeOpendP.then(function () {
    let addImpWaitP = driver.manage().setTimeouts({ implicit: 10000 });
    return addImpWaitP;
})
    .then(function () {
        // console.log("Home page opened");
        let emailPromise = driver.findElement(swd.By.css("#input-1"));
        let passwordPromise = driver.findElement(swd.By.css("#input-2"));
        let bothElemP = Promise.all([emailPromise, passwordPromise]);
        return bothElemP;
    }).then(function (beArr) {
        let EWillBeEP = beArr[0].sendKeys(email);
        let passwordEnteredP = beArr[1].sendKeys(pwd);
        let bothKeysWillBeEnteredP = Promise.all([EWillBeEP, passwordEnteredP]);
        return bothKeysWillBeEnteredP;
    }).then(function () {
        // email and pass entered
        let loginBtnP = driver.findElement(swd.By.css("button.auth-button"));
        return loginBtnP;
    }).then(function (loginBtn) {
        let clickP = loginBtn.click();
        return clickP;
    }).then(function () {
        let ipBtnP = driver.findElement(swd.By.css("#base-card-1-link"));
        return ipBtnP;
    }).then(function (ipBtn) {
        let btnWillBeclickedP = ipBtn.click();
        return btnWillBeclickedP;
    })
    .then(function () {
        let arrayBtnP = driver.findElement(swd.By.css("a[data-attr1='arrays']"));
        return arrayBtnP;
    }).then(function (arrayBtn) {
        let arrayBtnWillBeClickedP = arrayBtn.click();
        return arrayBtnWillBeClickedP;
    }).then(function () {
        // console.log("Reached questions page")
        // find all elements
        let allQsP = driver.findElements(swd.By.css(".js-track-click.challenge-list-item"));
        // parallely get href of all the anchors
        return allQsP;
    }).then(function (allQs) {
        let hrefpArr = [];
        // let hrefP = allQs[0].getAttribute("href");
        for (let i = 0; i < allQs.length; i++) {
            let hrefp = allQs[i].getAttribute("href");
            hrefpArr.push(hrefp);
        }
        // parallely solve ,order maintain
        let allHrefPArr = Promise.all(hrefpArr);
        return allHrefPArr;
    }).then(function (hrefArr) {
        console.log(hrefArr);
    })
    .catch(function (err) {
        console.log(err)
    })