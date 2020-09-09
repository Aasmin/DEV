/**
 * HACKERRANK CHALLENGE CREATION USING PUPPETEER
 */
// npm install puppeteer
// puppeteer=> require
let pp = require("puppeteer");
async function fn() {
    // headless browser
    let browser = await pp.launch({
        headless: false,
        defaultViewport: null,  //browser ka khud size nahi hoga, so need to define it
        args: ["--start-fullscreen"],
        slowMo: 100
    });
    let { email, pwd } = require("../../credentials");
    // let tab = await browser.newPage();   //next page te khulu ga
    let AllTabs = await browser.pages();    //same page te khuluga
    let tab = AllTabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login")
    await tab.type("#input-1", email);  //element dhundega and then type
    await tab.type("#input-2", pwd);
    // click=> login
    // await tab.click();
    await Promise.all([
        tab.waitForNavigation({ waitUntil: "networkidle0" }),
        tab.click("button.auth-button"),
    ]);
    await tab.click('a[data-analytics="NavBarProfileDropDown"]');
    await
        Promise.all([   //need to add waits which are event based (not the static wait)
            tab.waitForNavigation({ waitUntil: "networkidle0" }),   //agar button click hone se page change hota hai then use waitForNavigation
            tab.click("a[data-analytics='NavBarProfileDropDownAdministration']")]);
    // Performs release event on target element
    // driver.findElements - findelement ki jgah use $$
    let liArr = await tab.$$("ul.nav-tabs li");
    await liArr[1].click();
    let createChallengePageLink = await tab.url();
    console.log(createChallengePageLink);
    // parallely tab open 
    // browser.newPage();
}
fn();